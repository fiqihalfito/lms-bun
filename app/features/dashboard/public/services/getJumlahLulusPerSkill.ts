import { db } from "database/connect.server"
import { mSkill, mSubSkill, mTeam, mTeamMember, tKuis, tKuisProgress } from "database/schema"
import { and, eq, getColumns, gte, isNotNull, sql } from "drizzle-orm"
import * as R from "remeda";

type getJumlahLulusPerSkillProp = {
    idSubBidang?: string
}

export async function getJumlahLulusPerSkill({ idSubBidang }: getJumlahLulusPerSkillProp) {

    // ===== DB START =====
    // jumlah subskill per skill
    const subskillCount = db.select({
        idSkill: mSubSkill.idSkill,
        total: sql<number>`count(*)`.as("total")
    })
        .from(mSubSkill)
        .groupBy(mSubSkill.idSkill)
        .as("subskill_count")

    // jumlah subskill lulus per user per skill
    const userPassCount = db.select({
        idSkill: mSubSkill.idSkill,
        idUser: tKuisProgress.idUser,
        passed: sql<number>`count(*)`.as("passed")
    })
        .from(tKuisProgress)
        .innerJoin(mSubSkill, eq(mSubSkill.idKuis, tKuisProgress.idKuis))
        .where(and(
            isNotNull(tKuisProgress.completedAt),
            gte(sql`(${tKuisProgress.totalScore} / ${tKuisProgress.jumlahSoal}) * 100`, 80)
        ))
        .groupBy(mSubSkill.idSkill, tKuisProgress.idUser)
        .as("user_pass_count")

    // user yang lulus semua subskill
    const userSkillLulus = db.select({
        idSkill: userPassCount.idSkill,
        idUser: userPassCount.idUser,
    })
        .from(userPassCount)
        .innerJoin(subskillCount, eq(userPassCount.idSkill, subskillCount.idSkill))
        .where(eq(userPassCount.passed, subskillCount.total))
        .as("user_skill_lulus")

    // jumlah user lulus per skill
    const stat_lulus = db.select({
        idSkill: userSkillLulus.idSkill,
        jumlahLulus: sql<number>`count(*)`.as("jumlahLulus")
    })
        .from(userSkillLulus)
        .groupBy(userSkillLulus.idSkill)
        .as("stat_lulus")


    // const stat_subskillx = db.select({
    //     jumlahLulus: sql<number>`cast(sum(${stat_kuis.jumlahLulus}) as int)`.as("jumlahLulus"),
    //     idSkill: mSubSkill.idSkill,
    // })
    //     .from(mSubSkill)
    //     .leftJoin(stat_kuis, eq(mSubSkill.idKuis, stat_kuis.idKuis))
    //     .groupBy(mSubSkill.idSkill)
    //     .as("stat_subskill")

    const stat_skill = db.select({
        jumlahLulus: sql<number>`coalesce(${stat_lulus.jumlahLulus}, 0)`.mapWith(Number).as("jumlahLulus"),
        namaSkill: mSkill.namaSkill,
        idSkill: mSkill.idSkill,
        idTeam: mSkill.idTeam,
    })
        .from(mSkill)
        .leftJoin(stat_lulus, eq(mSkill.idSkill, stat_lulus.idSkill))
        .as("stat_skill")

    const stat_member_team = db.select({
        idTeam: mTeamMember.idTeam,
        jumlahOrangPerTeam: sql<number>`cast(count(${mTeamMember.idUser}) as int)`.as("jumlahOrangPerTeam"),
    })
        .from(mTeamMember)
        .groupBy(mTeamMember.idTeam)
        .as("stat_member_team")


    const { jumlahLulus, namaSkill } = getColumns(stat_skill)
    const { jumlahOrangPerTeam } = getColumns(stat_member_team)
    const stat_team = await db.select({
        jumlahLulus,
        namaSkill,
        namaTeam: mTeam.namaTeam,
        jumlahOrangPerTeam,
        idSubBidang: mTeam.idSubBidang,
    })
        .from(mTeam)
        .leftJoin(stat_skill, eq(mTeam.idTeam, stat_skill.idTeam))
        .leftJoin(stat_member_team, eq(mTeam.idTeam, stat_member_team.idTeam))
        .where(idSubBidang ? eq(mTeam.idSubBidang, idSubBidang) : undefined)

    // ===== DB END =====
    // ===== LOGIC START =====

    const mappingRes = R.pipe(
        stat_team,
        R.groupBy(x => x.namaTeam ?? "other_team"),
        R.entries(),
        R.map(([namaTeam, items]) => ({
            namaTeam,
            jumlahOrangPerTeam: items[0].jumlahOrangPerTeam,
            skill: items.map(item => ({
                namaSkill: item.namaSkill,
                jumlahLulus: item.jumlahLulus,
            })),
        }))
    );

    // ===== LOGIC END =====
    // ===== RETURN =====
    return mappingRes
}