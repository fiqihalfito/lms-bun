import { getJumlahLulusPerSkill } from "@/features/dashboard/public/services/getJumlahLulusPerSkill";
import type { Route } from "./+types/test-query";
import { db } from "database/connect.server";
import { mSubSkill, tKuisProgress } from "database/schema";
import { and, eq, getColumns, gte, sql } from "drizzle-orm";
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
        jumlahSubskill: sql`count(*)`.as("jumlahSubskill")
    })
        .from(mSubSkill)
        .groupBy(mSubSkill.idSkill, mSubSkill.level)
        .orderBy(mSubSkill.idSkill, mSubSkill.level)
        .as("t_jumlahSubskill")

    const t_level_lulus = await db.select()
        .from(t_lulus)
        .innerJoin(t_jumlahSubskill, and(eq(t_lulus.level, t_jumlahSubskill.level), eq(t_lulus.idSkill, t_jumlahSubskill.idSkill)))
        .where(
            eq(t_lulus.jumlahSubskillLulusPerLevel, t_jumlahSubskill.jumlahSubskill)
        )
    // .groupBy(t_lulus.idUser, t_lulus.idSkill, t_lulus.level)
    // .as("t_listUserLulusMaxLevel")



    return { t_level_lulus }
}