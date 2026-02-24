import { db } from "database/connect.server"
import { mUserProfiles } from "database/schema"

export async function getIndividuIndikator() {
    const res = await db.query.mTeam.findMany({
        with: {
            userProfiles: {
                // 
                with: {
                    // below show as expected but didnot get subskill list
                    // kuisProgress: {
                    //     extras: {
                    //         isLulus: (table, { sql }) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80`
                    //     }
                    // },                    
                    team: {
                        columns: {},
                        with: {
                            skill: {
                                with: {
                                    subSkill: {
                                        with: {
                                            // below show too much not related each user, it gains all like full join
                                            kuisProgress: {
                                                where: {
                                                    RAW: (table, { sql }) => sql`(${table.idUser} = ${mUserProfiles.idUser})`
                                                },
                                                extras: {
                                                    isLulus: (table, { sql }) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80`
                                                }
                                            },
                                            statusBaca: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                },

            }
        }
    })

    return res
}