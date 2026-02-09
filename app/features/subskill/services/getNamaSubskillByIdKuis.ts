import { db } from "database/connect.server";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function getNamaSubskillByIdKuis(idKuis: string) {
    const subskill = await db.select().from(mSubSkill).where(eq(mSubSkill.idKuis, idKuis))
    return subskill
}