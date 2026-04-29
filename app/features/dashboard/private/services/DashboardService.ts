import { DashboardQuery } from "../repo/DashboardQuery";

export abstract class DashboardService {
    static async getSkillAndStats(idSubBidang: string, idTeam: string | null, idUser: string) {
        const data = await DashboardQuery.findSkillAndStats(idSubBidang, idTeam, idUser)
        return data
    }
}