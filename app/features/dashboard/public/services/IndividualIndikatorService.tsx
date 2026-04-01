import { getFirstIdTeam } from "@/features/team/services/getFirstIdTeam";
import { getIndividuIndikator } from "../repositories/getIndividuIndikator";
import * as R from "remeda";

type IndividualIndikatorServiceFilter = {
    idTeam?: string | null
}

export async function IndividualIndikatorService(filter: IndividualIndikatorServiceFilter = {}) {


    let idTeam = filter.idTeam

    if (!idTeam) {
        // buat default jika tidak ada team
        idTeam = await getFirstIdTeam("s1")
    }

    const raw = await getIndividuIndikator({ idTeam })


    // transform
    const teamGroup = R.groupBy(raw, (item) => item.namaTeam || "other_team")
    const teamEntries = Object.entries(teamGroup)
    const teamMap = teamEntries.map(([namaTeam, users]) => {

        const userGroup = R.groupBy(users, (item) => item.namaUser || "other_user")
        const userEntries = Object.entries(userGroup)
        const userMap = userEntries.map(([namaUser, skills]) => {

            const skillGroup = R.groupBy(skills, (item) => item.namaSkill || "other_skill")
            const skillEntries = Object.entries(skillGroup)
            const skillMap = skillEntries.map(([namaSkill, levelSubskills]) => {

                const levelGroup = R.groupBy(levelSubskills, (item) => item.levelSubskill || "other_level")
                const levelEntries = Object.entries(levelGroup)
                const levelMap = levelEntries.map(([levelSubskill, subskills]) => {

                    const subskillItem = subskills.map((subskill, i) => ({
                        namaSubskill: subskill.namaSubSkill,
                        isLulus: subskill.isLulus,
                        isBaca: subskill.isBaca
                    }))

                    return {
                        level: levelSubskill,
                        subskills: subskillItem
                    }
                })

                return {
                    namaSkill,
                    level: levelMap
                }
            })

            return {
                namaUser,
                skills: skillMap
            }

        })

        return {
            namaTeam,
            users: userMap
        }

    })

    return teamMap

}
