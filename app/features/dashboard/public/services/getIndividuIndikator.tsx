import { db } from "database/connect.server"
import { mSkill, mSubSkill, mTeam, mTeamMember, mUserProfiles, tKuisProgress, tStatusBaca } from "database/schema"
import { and, eq, isNotNull, or, sql } from "drizzle-orm"
import * as R from "remeda";


export async function getIndividuIndikator() {
    // const res = await db.query.mTeam.findMany({
    //     with: {
    //         userProfiles: {
    //             // 
    //             with: {
    //                 // below show as expected but didnot get subskill list
    //                 // kuisProgress: {
    //                 //     extras: {
    //                 //         isLulus: (table, { sql }) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80`
    //                 //     }
    //                 // },                    
    //                 team: {
    //                     columns: {},
    //                     with: {
    //                         skill: {
    //                             with: {
    //                                 subSkill: {
    //                                     with: {
    //                                         // below show too much not related each user, it gains all like full join
    //                                         kuisProgress: {
    //                                             where: {
    //                                                 RAW: (table, { sql }) => sql`(${table.idUser} = ${mUserProfiles.idUser})`
    //                                             },
    //                                             extras: {
    //                                                 isLulus: (table, { sql }) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80`
    //                                             }
    //                                         },
    //                                         statusBaca: true
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             },

    //         }
    //     }
    // })

    // optimasi ini
    const user_subskill_lulus_baca = db.select({
        idSubSkill: mSubSkill.idSubSkill,
        idUser: tStatusBaca.idPembaca,
        isLulus: sql`(${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}) >= 80`.as("isLulus"),
        isBaca: sql`CASE WHEN ${tStatusBaca.idPembaca} IS NOT NULL THEN true ELSE false END`.as("isBaca"),
    })
        // .from(mSubSkill)
        // .leftJoin(tStatusBaca, and(
        //     eq(mSubSkill.idDokumen, tStatusBaca.idDokumen),
        // ))
        // .leftJoin(tKuisProgress, and(eq(mSubSkill.idKuis, tKuisProgress.idKuis), eq(tStatusBaca.idPembaca, tKuisProgress.idUser)))
        // .as("user_subskill_lulus_baca")
        .from(tStatusBaca)
        .leftJoin(mSubSkill, eq(mSubSkill.idDokumen, tStatusBaca.idDokumen))
        .leftJoin(tKuisProgress, and(eq(mSubSkill.idKuis, tKuisProgress.idKuis), eq(tStatusBaca.idPembaca, tKuisProgress.idUser)))
        .as("user_subskill_lulus_baca")
    // return user_subskill_lulus_baca


    const user_x_skill_x_subskill = db.select({
        idTeam: mTeamMember.idTeam,
        namaTeam: mTeam.namaTeam,
        idUser: mTeamMember.idUser,
        namaUser: mUserProfiles.namaUser,
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        idSubSkill: mSubSkill.idSubSkill,
        namaSubSkill: mSubSkill.namaSubSkill,
        levelSubskill: mSubSkill.level
    })
        .from(mTeamMember) // single row
        .leftJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam)) // single row
        .leftJoin(mUserProfiles, eq(mTeamMember.idUser, mUserProfiles.idUser)) // single row
        .leftJoin(mSkill, eq(mTeamMember.idTeam, mSkill.idTeam)) // multiple rows
        .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill)) // multiple rows
        .where(isNotNull(mTeamMember.idTeam))
        .orderBy(mTeam.namaTeam, mUserProfiles.namaUser, mSkill.namaSkill, mSubSkill.level)
        .as("user_x_skill_x_subskill")
    // team -> user -> skill -> subskill


    const user_x_subskill_lulus_baca = await db.select({
        // idTeam: user_x_skill_x_subskill.idTeam,
        namaTeam: user_x_skill_x_subskill.namaTeam,
        // idUser: user_x_skill_x_subskill.idUser,
        namaUser: user_x_skill_x_subskill.namaUser,
        // idSkill: user_x_skill_x_subskill.idSkill,
        namaSkill: user_x_skill_x_subskill.namaSkill,
        idSubSkill: user_x_skill_x_subskill.idSubSkill,
        namaSubSkill: user_x_skill_x_subskill.namaSubSkill,
        levelSubskill: user_x_skill_x_subskill.levelSubskill,
        isLulus: user_subskill_lulus_baca.isLulus,
        isBaca: user_subskill_lulus_baca.isBaca
    })
        .from(user_x_skill_x_subskill)
        .leftJoin(user_subskill_lulus_baca, and(
            eq(user_x_skill_x_subskill.idUser, user_subskill_lulus_baca.idUser),
            eq(user_x_skill_x_subskill.idSubSkill, user_subskill_lulus_baca.idSubSkill)
        ))
        // tes beberapa user aja
        .where(or(
            eq(user_x_skill_x_subskill.idUser, "c5c966fa-5081-462f-b0d5-493addfe7131"),
            eq(user_x_skill_x_subskill.idUser, "9f42c1c4-0813-4ea5-8cf8-aacefee73d97")
        ))

    // return user_x_subskill_lulus_baca

    const teams = {}
    for (const row of user_x_subskill_lulus_baca) {
        // TEAM
        if (!teams[row.namaTeam]) {
            teams[row.namaTeam] = {
                namaTeam: row.namaTeam,
                users: {}
            }
        }

        const team = teams[row.namaTeam]

        // USER
        if (!team.users[row.namaUser]) {
            team.users[row.namaUser] = {
                namaUser: row.namaUser,
                skills: {}
            }
        }

        const user = team.users[row.namaUser]

        // SKILL
        if (!user.skills[row.namaSkill]) {
            user.skills[row.namaSkill] = {
                namaSkill: row.namaSkill,
                levels: {}   // 🔥 grouping level di sini
            }
        }

        const skill = user.skills[row.namaSkill]

        // LEVEL
        const level = row.levelSubskill

        if (!skill.levels[level]) {
            skill.levels[level] = {
                level: level,
                subSkills: []
            }
        }

        skill.levels[level].subSkills.push({
            idSubSkill: row.idSubSkill,
            namaSubSkill: row.namaSubSkill,
            isLulus: row.isLulus,
            isBaca: row.isBaca
        })
    }

    // convert object → array
    return Object.values(teams).map(team => ({
        ...team,
        users: Object.values(team.users).map(user => ({
            ...user,
            skills: Object.values(user.skills).map(skill => ({
                ...skill,
                levels: Object.values(skill.levels)
            }))
        }))
    }))
}