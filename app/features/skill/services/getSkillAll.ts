import { db } from "database/connect.server";
import { mSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function getSkillAll(idTeam: string) {
    const res = await db.select().from(mSkill).where(eq(mSkill.idTeam, idTeam)).orderBy(mSkill.namaSkill)
    return res
}