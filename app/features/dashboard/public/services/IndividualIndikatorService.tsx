import { getIndividuIndikator } from "../repositories/getIndividuIndikator";
import * as R from "remeda";

export async function IndividualIndikatorService() {
    const raw = await getIndividuIndikator()


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
