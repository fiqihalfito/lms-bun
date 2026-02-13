import { db } from "database/connect.server"
import { mSkill, mSubSkill, mTeam, mTeamMember, tKuis, tKuisProgress } from "database/schema"
import { eq, getColumns, sql } from "drizzle-orm"

type getJumlahLulusPerSkillProp = {
    idSubBidang?: string
}

export async function getJumlahLulusPerSkill({ idSubBidang }: getJumlahLulusPerSkillProp) {
    // const res = await db.query.mTeam.findMany({
    //     where: {
    //         idSubBidang: idSubBidang ?? undefined
    //     },
    //     with: {
    //         skill: {
    //             extras: {
    //                 jumlahLulus: (table) => db.$count(tKuisProgress, eq(tKuisProgress.idKuis, table.idKuis)),
    //             }
    //         }
    //     }
    // })
    const stat_kuis = db.select(
        {
            idKuis: tKuis.idKuis,
            jumlahLulus: sql<number>`cast(count(${tKuisProgress.idKuisProgress}) as int)`.as("jumlahLulus"),
        }
    )
        .from(tKuisProgress)
        .leftJoin(tKuis, eq(tKuis.idKuis, tKuisProgress.idKuis))
        .groupBy(tKuis.idKuis)
        .as("stat_kuis")

    const stat_subskill = db.select({
        // ...getColumns(stat_kuis),
        jumlahLulus: sql<number>`cast(sum(${stat_kuis.jumlahLulus}) as int)`.as("jumlahLulus"),
        idSkill: mSubSkill.idSkill,
    })
        .from(mSubSkill)
        .leftJoin(stat_kuis, eq(mSubSkill.idKuis, stat_kuis.idKuis))
        .groupBy(mSubSkill.idSkill)
        .as("stat_subskill")

    const stat_skill = db.select({
        jumlahLulus: sql<number>`coalesce(${stat_subskill.jumlahLulus}, 0)`.as("jumlahLulus"),
        namaSkill: mSkill.namaSkill,
        idSkill: mSkill.idSkill,
        idTeam: mSkill.idTeam,
    })
        .from(mSkill)
        .leftJoin(stat_subskill, eq(mSkill.idSkill, stat_subskill.idSkill))
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


    return stat_team
}