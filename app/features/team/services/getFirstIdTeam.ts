import { db } from "database/connect.server";

export async function getFirstIdTeam(idSubBidang: string) {
    const res = await db.query.mTeam.findFirst({
        where: {
            idSubBidang: idSubBidang
        },
        orderBy: {
            namaTeam: "asc"
        }
    })
    return res?.idTeam
}