import { TeamService } from "@/features/team/services/TeamService";
import { DashboardQuery } from "../repo/DashboardQuery";
import * as R from 'remeda'

export abstract class DashboardService {


    static async getUserResultSkills(idUser: string) {
        // const idTeam = await TeamService.getIdTeamByIdUser(idUser)
        const data = await DashboardQuery.findUserResultSkills(idUser)

        // transform optimized =====================================
        const skillsAudit = data?.skills.map(({ subSkill, ...rest }) => {
            // Group by level dalam 1x pass — O(n)
            const levelMap = new Map<number, typeof subSkill>()
            for (const sub of subSkill) {
                if (!levelMap.has(sub.level)) levelMap.set(sub.level, [])
                levelMap.get(sub.level)!.push(sub)
            }

            // Sort levels, lalu hitung stats dalam 1 pass per group
            const groupLevel = [...levelMap.keys()]
                .sort((a, b) => a - b)
                .map((level) => {
                    const subs = levelMap.get(level)!
                    let sudahBaca = 0, lulusKuis = 0

                    for (const sub of subs) {
                        if (sub.statusBaca !== null) sudahBaca++
                        if (sub.kuisProgress?.isLulus) lulusKuis++
                    }

                    return {
                        level,
                        jumlahSubskill: subs.length,
                        sudahBaca,
                        lulusKuis,
                    }
                })

            return { ...rest, groupLevel }
        })

        return skillsAudit

        // transform old ===========================================
        // const skillsAudit = data?.skills.map((skill) => {
        //     const levels = [...new Set(skill.subSkill.map((subSkill) => subSkill.level))].sort((a, b) => a - b)
        //     const levelGroupSubskill = levels.map((level) => {
        //         const subSkills = skill.subSkill.filter((subSkill) => subSkill.level === level)
        //         const jumlahSubskill = subSkills.length
        //         const sudahBaca = subSkills.filter((subSkill) => subSkill.statusBaca !== null).length
        //         const lulusKuis = subSkills.filter((subSkill) => subSkill.kuisProgress?.isLulus).length
        //         return {
        //             level,
        //             jumlahSubskill,
        //             sudahBaca,
        //             lulusKuis,
        //         }
        //     })

        //     const { subSkill, ...rest } = skill
        //     return {
        //         ...rest,
        //         groupLevel: levelGroupSubskill,
        //     }
        // })
        // return skillsAudit
    }
}