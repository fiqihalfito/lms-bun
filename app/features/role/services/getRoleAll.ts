import { db } from "database/connect";
import { mRole } from "database/schema";

export async function getRoleAll() {
    const res = await db.select().from(mRole)
    return res
}