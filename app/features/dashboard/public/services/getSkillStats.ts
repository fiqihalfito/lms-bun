import { db } from "database/connect";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function getSkillStats() {
    const res = await db.query.mTeam.findMany({
        with: {
            skill: {
                with: {
                    subSkill: {
                        extras: {
                            jumlahSelesaiSubskill: db.$count(mSubSkill, eq(mSubSkill.))
                        }
                    }
                }
            }
        }
    })
}