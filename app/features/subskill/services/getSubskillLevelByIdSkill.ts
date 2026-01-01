import { db } from "database/connect"
import { mSubSkill } from "database/schema"
import { count, eq } from "drizzle-orm"

export async function getSubskillLevelByIdSkill(idSkill: string) {
    const res = await db.select({
        level: mSubSkill.level,
        jumlah: count(mSubSkill.level)
    }).from(mSubSkill)
        .where(eq(mSubSkill.idSkill, idSkill))
        .groupBy(mSubSkill.level)
        .orderBy(mSubSkill.level)
    return res
}