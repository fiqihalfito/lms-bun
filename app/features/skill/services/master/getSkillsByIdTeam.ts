import { db } from "database/connect.server";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function getSkillsByIdTeam(idTeam: string) {
    const res = await db.query.mSkill.findMany({
        where: {
            idTeam: idTeam
        },
        extras: {
            jumlahSubskill: (table) => db.$count(mSubSkill, eq(table.idSkill, mSubSkill.idSkill))
        }
    })
    return res
}