import { db } from "database/connect.server";
import { mUserProfiles } from "database/schema";
import { eq, getColumns } from "drizzle-orm";

export async function getUserProfilesByIdUser(idUser: string) {
    // return await db.select().from(mUserProfiles).where(eq(mUserProfiles.idUser, idUser));
    const res = await db.query.mUserProfiles.findMany({
        where: {
            idUser: idUser
        },
        with: {
            team: true,
            subBidang: true
        }
    })
    return res
}