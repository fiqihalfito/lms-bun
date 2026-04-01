import { db } from "database/connect.server";
import { mLayanan } from "database/schema";
import { eq } from "drizzle-orm";

export async function getLayananById(idLayanan: string) {
    const res = await db.select().from(mLayanan).where(eq(mLayanan.idLayanan, idLayanan))
    return res
}