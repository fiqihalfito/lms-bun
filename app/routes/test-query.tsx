import { getJumlahLulusPerSkill } from "@/features/dashboard/public/services/getJumlahLulusPerSkill";
import type { Route } from "./+types/test-query";
import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, mTeamMember, mUserProfiles, tKuisProgress } from "database/schema";
import { and, desc, eq, getColumns, gte, isNotNull, sql } from "drizzle-orm";
// import { getLevelSubskillListDataByIdSkill } from "@/features/subskill/services/getSubskillLevelByIdSkill";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    // const res = await getJumlahLulusPerSkill({ idSubBidang: "s1" })

    // const res = await getLevelSubskillListDataByIdSkill("a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1", "c5c966fa-5081-462f-b0d5-493addfe7131")

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
    // return { t_lulus }

    // const t_lulus_col = getColumns(t_lulus)
    // const rankedLevelPerUser = db
    //     .select({
    //         ...t_lulus_col,
    //         rn: sql<number>`
    //         row_number() over (
    //             partition by ${t_lulus.idUser}, ${t_lulus.idSkill}
    //             order by ${t_lulus.level} desc
    //         )
    //         `.mapWith(Number).as("rn")
    //     })
    //     .from(t_lulus)
    //     .as("rankedLevelPerUser");

    // const t_userCurrentSkillLulus = db
    //     .select()
    //     .from(rankedLevelPerUser)
    //     .where(eq(rankedLevelPerUser.rn, 1))
    //     .as("t_userCurrentSkillLulus")

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
        jumlahSubskillLulusPerLevel: t_lulus.jumlahSubskillLulusPerLevel,
        jumlahSubskillTarget: t_jumlahSubskill.jumlahSubskill
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

    const t_level_lulus_tertinggi_col = getColumns(t_level_lulus_tertinggi)
    const t_joinedUserSkill = await db.select({
        ...t_level_lulus_tertinggi_col,
        // idTeam: mTeamMember.idTeam,
        namaUser: mUserProfiles.namaUser,
        namaTeam: mTeam.namaTeam,
        namaSkill: mSkill.namaSkill
    })
        .from(mUserProfiles)
        .leftJoin(mTeamMember, and(
            eq(mUserProfiles.idUser, mTeamMember.idUser),
            isNotNull(mTeamMember.idTeam)
        ))
        .leftJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam))
        .leftJoin(t_level_lulus_tertinggi, eq(mUserProfiles.idUser, t_level_lulus_tertinggi.idUser))
        .leftJoin(mSkill, eq(t_level_lulus_tertinggi.idSkill, mSkill.idSkill))


    return { t_joinedUserSkill }
}