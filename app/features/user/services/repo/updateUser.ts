import { mUsers } from "database/schema";
import { eq } from "drizzle-orm";
import { db } from "database/connect.server";

export async function updateUser(idUser: string, userAccount: typeof mUsers.$inferInsert) {
    await db.update(mUsers).set(userAccount).where(eq(mUsers.idUser, idUser))
}