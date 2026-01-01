import { db } from "database/connect";
import { mUsers } from "database/schema";

export async function insertUserAccount(userAccount: typeof mUsers.$inferInsert) {
    const newIdUser = await db.insert(mUsers).values(userAccount).returning({ idUser: mUsers.idUser })
    return newIdUser
}