import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, mTeamMember, mUserProfiles, tKuisProgress } from "database/schema";
import { and, desc, eq, getColumns, gte, isNotNull, sql } from "drizzle-orm";
import * as R from "remeda";


type getStatIndividuProp = {
    idSubBidang?: string
}

export async function getStatIndividu({ idSubBidang }: getStatIndividuProp) {
    const t_lulus = db.select({
        idUser: tKuisProgress.idUser,
        idSkill: mSubSkill.idSkill,
        level: mSubSkill.level,
        jumlahSubskillLulusPerLevel: sql`cast(count(${mSubSkill.level}) as int)`.as("jumlahSubskillLulusPerLevel")
    }).from(tKuisProgress)
        .innerJoin(mSubSkill, eq(tKuisProgress.idKuis, mSubSkill.idKuis))
        .where(and(
            gte(sql`(${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal})`, 80))
        )
        .groupBy(tKuisProgress.idUser, mSubSkill.idSkill, mSubSkill.level)
        .orderBy(tKuisProgress.idUser, mSubSkill.level)
        .as("t_lulus")

    const t_jumlahSubskill = db.select({
        idSkill: mSubSkill.idSkill,
        level: mSubSkill.level,
        jumlahSubskill: sql<number>`count(*)`.mapWith(Number).as("jumlahSubskill")
    })
        .from(mSubSkill)
        .groupBy(mSubSkill.idSkill, mSubSkill.level)
        .orderBy(mSubSkill.idSkill, mSubSkill.level)
        .as("t_jumlahSubskill")

    const t_level_lulus = db.select({
        idUser: t_lulus.idUser,
        idSkill: t_lulus.idSkill,
        level: t_lulus.level,
        jumlahSubskillLulusPerLevel: sql`COALESCE(${t_lulus.jumlahSubskillLulusPerLevel}, 0)`.mapWith(Number).as("jumlahSubskillLulusPerLevel"),
        jumlahSubskillTarget: sql`COALESCE(${t_jumlahSubskill.jumlahSubskill}, 0)`.mapWith(Number).as("jumlahSubskillTarget")
    })
        .from(t_lulus)
        .innerJoin(t_jumlahSubskill, and(eq(t_lulus.level, t_jumlahSubskill.level), eq(t_lulus.idSkill, t_jumlahSubskill.idSkill)))
        .where(
            eq(t_lulus.jumlahSubskillLulusPerLevel, t_jumlahSubskill.jumlahSubskill)
        )
        .as("t_level_lulus")
    // return { t_level_lulus }

    // khusus postgresql, gunakan distinct on order by untuk ambil 1 row dengan level tertinggi misalnya
    // distinct on [kolom] menghapus row dengan kolom duplikat dan ambil yang paling atas saja (ini dikarenakan sudah order by)
    // contoh: 
    // select distinct on (idUser, idSkill) * from t_level_lulus order by idUser, idSkill, level desc
    // Kalau:
    // DISTINCT ON (A, B, C)
    // Maka wajib:
    // ORDER BY A, B, C, ...
    // Itu rule absolut.
    const t_level_lulus_tertinggi = db.selectDistinctOn([t_level_lulus.idUser, t_level_lulus.idSkill])
        .from(t_level_lulus)
        .orderBy(t_level_lulus.idUser, t_level_lulus.idSkill, desc(t_level_lulus.level))
        .as("t_level_lulus_tertinggi")
    // selain metode distinct on di postgresql, alternatif bisa pakai row_number() over (partition by ... order by ...)
    // contoh: 
    // select * from (
    //     select 
    //         *, 
    //         row_number() over (partition by idUser, idSkill order by level desc) as rn
    //     from t_level_lulus
    // ) as t_level_lulus_tertinggi
    // where rn = 1

    const t_level_lulus_tertinggi_col = getColumns(t_level_lulus_tertinggi)
    const t_joinedUserSkill = await db.select({
        ...t_level_lulus_tertinggi_col,
        namaUser: mUserProfiles.namaUser,
        namaTeam: mTeam.namaTeam,
        namaSkill: mSkill.namaSkill
    })
        .from(mUserProfiles)
        // .leftJoin(mTeamMember, and(
        //     eq(mUserProfiles.idUser, mTeamMember.idUser),
        //     isNotNull(mTeamMember.idTeam)
        // ))
        // .leftJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam))
        .innerJoin(mTeamMember,
            and(
                eq(mUserProfiles.idUser, mTeamMember.idUser),
                isNotNull(mTeamMember.idTeam)
            )
        )
        .innerJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam))
        .leftJoin(t_level_lulus_tertinggi, eq(mUserProfiles.idUser, t_level_lulus_tertinggi.idUser))
        .leftJoin(mSkill, eq(t_level_lulus_tertinggi.idSkill, mSkill.idSkill))
        .where(
            and(
                idSubBidang ? eq(mUserProfiles.idSubBidang, idSubBidang) : undefined,
                isNotNull(mTeamMember.idTeam)
            )
        )
        .orderBy(mTeam.namaTeam, mUserProfiles.namaUser)

    const mappingRes = R.pipe(
        t_joinedUserSkill,
        R.groupBy(x => x.namaTeam ?? "other_team"),
        R.entries(),
        R.map(([namaTeam, membersData]) => ({
            namaTeam,
            users: R.pipe(
                membersData,
                R.groupBy(member => member.namaUser),
                R.entries(),
                R.map(([namaUser, listCurrSkills]) => ({
                    namaUser,
                    skills: listCurrSkills.map(skill => ({
                        namaSkill: skill.namaSkill,
                        level: skill.level,
                    })),
                }))
            )
        }))
    );

    return mappingRes

}