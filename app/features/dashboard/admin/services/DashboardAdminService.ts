import { DashboardAdminQuery } from "../repo/DashboardAdminQuery";

export abstract class DashboardAdminService {
    static async getPicUploadStatus() {
        const data = await DashboardAdminQuery.findPicProgressStatus()
        return data
    }
}