import { db } from "database/connect.server";

export async function getUserProfileAll(idSubBidang: string) {
    const res = await db.query.mUserProfiles.findMany({
        with: {
            userAccount: true
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