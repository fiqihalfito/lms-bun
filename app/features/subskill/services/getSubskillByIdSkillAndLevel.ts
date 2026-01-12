import { db } from "database/connect";
import { mSubSkill } from "database/schema";
import { and, eq, sql } from "drizzle-orm";

export async function getSubskillByIdSkillAndLevel(idSkill: string, level: number, idPembaca: string) {
    // const subskill = await db.select().from(mSubSkill)
    //     .where(and(eq(mSubSkill.idSkill, idSkill), eq(mSubSkill.level, level)))
    //     .orderBy(mSubSkill.urutan)
    const res = await db.query.mSubSkill.findMany({
        where: {
            idSkill: idSkill,
            level: level
        },
        orderBy: {
            urutan: 'asc'
        },
        with: {
            kuis: {
                with: {
                    questions: {
                        columns: {
                            idKuisQuestion: true
                        }
                    }
                }
            },
            dokumen: {
                with: {
                    statusBacaOne: {
                        where: {
                            idPembaca: idPembaca
                        }
                    }
                }
            },
            pic: true,
            kuisProgress: {
                where: {
                    idUser: idPembaca
                },
                extras: {
                    persentaseBenar: (table) => sql<number>`(${table.jumlahBenar} * 100.0) / NULLIF(${table.jumlahSoal}, 0)`
                }
            }
        }
    })

    // tambahkan prop persentase semua pengerjaan kuis
    const totalPersentasePerLevel = res.reduce((acc, subskill) => {
        if (subskill.kuisProgress?.persentaseBenar) {
            acc += subskill.kuisProgress.persentaseBenar
        }
        return acc
    }, 0)
    const rataPersentase = totalPersentasePerLevel / res.length
    const finalRes = {
        subskills: res,
        rataPersentase: rataPersentase
    }
    return finalRes
}