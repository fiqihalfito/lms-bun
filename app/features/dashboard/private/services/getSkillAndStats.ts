import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, gte, sql } from "drizzle-orm";

type GroupLevelType = Record<string, {
    jumlahSubskill: number;
    sudahBaca: number;
    lulusKuis: number;
}>

export async function getSkillAndStats(idSubBidang: string, idTeam: string | null, idUser: string) {
    const subquery_statbaca = db.select({
        idDokumen: tStatusBaca.idDokumen,
        idPembaca: tStatusBaca.idPembaca,
    })
        .from(tStatusBaca)
        .where(eq(tStatusBaca.idPembaca, idUser))
        .as("subquery_statbaca")

    const subquery_statkuis = db.select({
        idKuis: tKuisProgress.idKuis,
        idUser: tKuisProgress.idUser,
    })
        .from(tKuisProgress)
        .where(and(
            eq(tKuisProgress.idUser, idUser),
            gte(sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`, 80)
        )).as("subquery_statkuis")

    const subquery_subskilllevel = db.select({
        idSkill: mSubSkill.idSkill,
        level: mSubSkill.level,
        jumlahSubskill: sql`cast(count(${mSubSkill.idSubSkill}) as int)`.as("jumlahSubskill"),
        sudahBaca: sql`cast(count(${subquery_statbaca.idDokumen}) as int)`.as("sudahBaca"),
        lulusKuis: sql`cast(count(${subquery_statkuis.idKuis}) as int)`.as("lulusKuis")
    })
        .from(mSubSkill)
        .leftJoin(subquery_statbaca, eq(mSubSkill.idDokumen, subquery_statbaca.idDokumen))
        .leftJoin(subquery_statkuis, eq(mSubSkill.idKuis, subquery_statkuis.idKuis))
        .groupBy(mSubSkill.idSkill, mSubSkill.level)
        .orderBy(mSubSkill.level)
        .as("subquery_subskilllevel")

    const query_skill = db.select({
        idTeam: mSkill.idTeam,
        namaTeam: mTeam.namaTeam,
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        groupLevel: sql<GroupLevelType>`
            json_object_agg(
                ${subquery_subskilllevel.level},
                json_build_object(
                    'jumlahSubskill', ${subquery_subskilllevel.jumlahSubskill},
                    'sudahBaca', ${subquery_subskilllevel.sudahBaca},
                    'lulusKuis', ${subquery_subskilllevel.lulusKuis}
                )
                ORDER BY ${subquery_subskilllevel.level}
            )
        `.as("groupLevel"),
        totalSubskill: sql`sum(${subquery_subskilllevel.jumlahSubskill})`.mapWith(Number).as("totalSubskill"),
        totalBaca: sql`sum(${subquery_subskilllevel.sudahBaca})`.mapWith(Number).as("totalBaca"),
        totalLulusKuis: sql`sum(${subquery_subskilllevel.lulusKuis})`.mapWith(Number).as("totalLulusKuis"),
    })
        .from(mSkill)
        .leftJoin(subquery_subskilllevel, eq(mSkill.idSkill, subquery_subskilllevel.idSkill))
        .leftJoin(mTeam, eq(mSkill.idTeam, mTeam.idTeam))
        .where(eq(mSkill.idSubBidang, idSubBidang))
        .groupBy(mSkill.idSkill, mSkill.namaSkill, mSkill.idTeam, mTeam.namaTeam)
        .as("query_skill")

    const query_team = await db.select({
        idTeam: query_skill.idTeam,
        namaTeam: query_skill.namaTeam,
        groupTeam: sql<{
            idSkill: string;
            namaSkill: string;
            groupLevel: GroupLevelType;
            totalSubskill: number;
            totalBaca: number;
            totalLulusKuis: number;
        }[]>`
            jsonb_agg(
                json_build_object(
                    'idSkill', ${query_skill.idSkill},
                    'namaSkill', ${query_skill.namaSkill},
                    'groupLevel', ${query_skill.groupLevel},
                    'totalSubskill', ${query_skill.totalSubskill},
                    'totalBaca', ${query_skill.totalBaca},
                    'totalLulusKuis', ${query_skill.totalLulusKuis}
                )
            )
        `.as("groupTeam"),
    })
        .from(query_skill)
        .groupBy(query_skill.idTeam, query_skill.namaTeam)
        .orderBy(sql`CASE WHEN ${query_skill.idTeam} = ${idTeam} THEN 1 ELSE 2 END`) //priority current team

    return query_team

}