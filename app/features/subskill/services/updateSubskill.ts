import { db } from "database/connect";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateSubskill(idSubSkill: string, subskill: typeof mSubSkill.$inferInsert) {
    await db.update(mSubSkill).set(subskill).where(eq(mSubSkill.idSubSkill, idSubSkill))
}