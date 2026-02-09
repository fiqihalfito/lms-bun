import { db } from "database/connect.server";

export async function getUserDataByIdUser(idUser: string) {
    const res = await db.query.mUserProfiles.findFirst({
        where: {
            idUser: idUser
        },
        with: {
            userAccount: {
                columns: {
                    password: false
                }
            },
        }
    })

    return res
}