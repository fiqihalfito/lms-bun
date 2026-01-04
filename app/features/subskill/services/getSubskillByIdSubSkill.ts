import { db } from "database/connect";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function getSubskillByIdSubskill(idSubskill: string) {
    const res = await db.query.mSubSkill.findFirst({
        where: {
            idSubSkill: idSubskill
        },
        with: {
            skill: {
                columns: {
                    namaSkill: true,
                    idSkill: true
                }
            }
        }

    })
    return res
}