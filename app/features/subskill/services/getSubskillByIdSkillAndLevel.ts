import { db } from "database/connect";
import { mSubSkill } from "database/schema";
import { and, eq } from "drizzle-orm";

export async function getSubskillByIdSkillAndLevel(idSkill: string, level: number) {
    // const subskill = await db.select().from(mSubSkill)
    //     .where(and(eq(mSubSkill.idSkill, idSkill), eq(mSubSkill.level, level)))
    //     .orderBy(mSubSkill.urutan)
    const res = await db.query.mSubSkill.findMany({
        where: {
            idSkill: idSkill,
            level: level
        },
        orderBy: {
            urutan: 'asc'
        },
        with: {
            kuis: {
                with: {
                    questions: {
                        columns: {
                            idKuisQuestion: true
                        }
                    }
                }
            }
        }
    })
    return res
}