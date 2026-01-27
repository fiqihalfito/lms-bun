import { db } from "database/connect";

export async function getSubskillBelumUploadDokumen() {
    const res = await db.query.mSubSkill.findMany({
        orderBy: {
            level: "asc"
        },
        with: {
            pic: {
                columns: {
                    namaUser: true
                },
                orderBy: {
                    namaUser: "asc",
                },
                with: {
                    team: {
                        columns: {
                            namaTeam: true
                        },
                        orderBy: {
                            namaTeam: "asc"
                        }
                    }
                }
            },
            skill: {
                columns: {
                    namaSkill: true
                },
                orderBy: {
                    namaSkill: "asc"
                }
            },
            kuis: {
                columns: {
                    idKuis: true
                }
            }
        }
    })

    return res
}

// type SubSkillRow = {
//     idSubSkill: string
//     namaSubSkill: string
//     level: number
//     urutan: number
//     idSkill: string
//     picNama: string | null
//     picTeam: string | null
// }

export function mapToExcelRow(item: Awaited<ReturnType<typeof getSubskillBelumUploadDokumen>>[number]) {

    return {
        namaSkill: item.skill?.namaSkill ?? null,
        namaSubSkill: item.namaSubSkill,
        level: item.level,
        picNama: item.pic?.namaUser ?? null,
        picTeam: item.pic?.team?.map((t: any) => t.namaTeam).join(", ") ?? null,
        sudahDokumen: item.idDokumen !== null,
        idDokumen: item.idDokumen ?? null,
        sudahBuatKuis: item.idKuis !== null
    }
}
