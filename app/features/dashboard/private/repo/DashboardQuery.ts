import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, gte, sql } from "drizzle-orm";

type GroupLevelType = Record<string, {
    jumlahSubskill: number;
    sudahBaca: number;
    lulusKuis: number;
}>


export abstract class DashboardQuery {


    static async findUserResultSkills(idUser: string) {
        const data = await db.query.mUserProfiles.findFirst({
            columns: {
                idUser: true,
                namaUser: true
            },
            where: {
                idUser: idUser
            },
            with: {
                skills: {
                    columns: {
                        idSkill: true,
                        namaSkill: true,
                    },
                    with: {
                        subSkill: {
                            columns: {
                                idSubSkill: true,
                                namaSubSkill: true,
                                level: true,
                                urutan: true,
                            },
                            orderBy: {
                                level: "asc"
                            },
                            with: {
                                kuisProgress: {
                                    columns: {
                                        jumlahBenar: true,
                                        jumlahSoal: true,
                                    },
                                    extras: {
                                        isLulus: (table) => sql<boolean>`CASE WHEN ${table.jumlahBenar} * 100 / ${table.jumlahSoal} >= 80 THEN 1 ELSE 0 END`
                                            .mapWith(Boolean)
                                            .as("isLulus")
                                    }
                                },
                                statusBaca: {
                                    columns: {
                                        idStatusBaca: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        return data
    }
}