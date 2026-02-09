import { db } from "database/connect.server";
import { mUsers } from "database/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
    const res = await db.select().from(mUsers).where(eq(mUsers.email, email))

    return res
}