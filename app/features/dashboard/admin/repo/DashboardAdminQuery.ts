import { db } from "database/connect.server";
import { mSubSkill, tKuisQuestion } from "database/schema";
import { and, eq, isNotNull } from "drizzle-orm";

export abstract class DashboardAdminQuery {
    static async findPicProgressStatus() {
        const data = await db.query.mUserProfiles.findMany({
            columns: {
                namaUser: true,
                idUser: true,
            },
            orderBy: {
                namaUser: "asc"
            },
            where: {
                subSkill: true,
                // namaUser: {
                //     ilike: "%hakim%"
                // }
            },
            with: {
                subSkill: {
                    columns: {
                        namaSubSkill: true,
                        level: true,
                        idDokumen: true
                    },
                    orderBy: {
                        level: "asc"
                    },
                    with: {
                        kuis: {
                            columns: {},
                            extras: {
                                jumlahSoal: (table) => db.$count(tKuisQuestion, eq(tKuisQuestion.idKuis, table.idKuis))
                            }
                        }

                    },
                }
            },
            extras: {
                jumlahDokumenUpload: (table) => db.$count(mSubSkill, and(eq(mSubSkill.idPic, table.idUser), isNotNull(mSubSkill.idDokumen))),
                jumlahSubskill: (table) => db.$count(mSubSkill, eq(mSubSkill.idPic, table.idUser))
            }
        })

        return data
    }
}