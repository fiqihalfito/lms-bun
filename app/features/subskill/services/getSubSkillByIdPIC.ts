import { db } from "database/connect";

export async function getSubSkillByIdPIC(idPIC: string, idSkill: string) {
    const res = await db.query.mSubSkill.findMany({
        where: {
            idPic: idPIC,
            idSkill: idSkill
        },
        orderBy: {
            level: "asc",
            urutan: "asc"
        },
        with: {
            pic: {
                columns: {
                    namaUser: true
                }
            },
            kuis: {
                with: {
                    questions: {
                        columns: {
                            idKuisQuestion: true
                        }
                    }
                }
            }

        }
    })

    const levels = Array.from(new Set(res.map((item) => item.level)))
    const mappedSubskills = levels.map((level) => {
        return {
            level,
            subskills: res.filter((item) => item.level === level)
        }
    })

    return mappedSubskills

}