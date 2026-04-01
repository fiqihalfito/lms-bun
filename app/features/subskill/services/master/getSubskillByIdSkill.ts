import { db } from "database/connect.server";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function getSubskillByIdSkill(idSkill: string) {
    const res = await db.select().from(mSubSkill).where(eq(mSubSkill.idSkill, idSkill))
    return res
}