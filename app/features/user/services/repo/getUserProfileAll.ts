import { db } from "database/connect.server";

export async function getUserProfileAll(idSubBidang: string) {
    const res = await db.query.mUserProfiles.findMany({
        with: {
            userAccount: {
                columns: {
                    password: false
                }
            },
            team: true
        },
        where: {
            idSubBidang: idSubBidang
        },
        orderBy: {
            namaUser: "asc"
        }
    })

    return res
}