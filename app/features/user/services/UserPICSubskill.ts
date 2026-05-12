import { SubskillQuery } from "@/features/subskill/repo/SubskillQuery";
import { UserProfileQuery } from "../repo/UserProfile/UserProfileQuery";

export abstract class UserPICSubskillService {

    static async getPICSubskill(idSubBidang: string) {
        const data = await UserProfileQuery.findAllPicWithCountSubskill(idSubBidang);
        return data;
    }

    static async checkIsPIC(idPic: string) {
        const data = await UserProfileQuery.findIdPic(idPic);
        return !!data;
    }

    static async deletePICSubskill(idUser: string) {
        // check is pic is registered in subskill
        const isRegisteredPicSubskill = await SubskillQuery.findIdPICExist(idUser);
        if (isRegisteredPicSubskill) {
            throw new Error("Error: PIC masih terdaftar di subskill");
        }
        const data = await UserProfileQuery.deletePICSubskill(idUser);
        return data;
    }

    static async savePICSubskill(idUser: string) {
        // check is user already pic
        const isRegisteredPicSubskill = await this.checkIsPIC(idUser);

        if (isRegisteredPicSubskill) {
            throw new Error("Error: User sudah terdaftar sebagai PIC");
        }
        await UserProfileQuery.insertPICSubskill(idUser);
    }
}