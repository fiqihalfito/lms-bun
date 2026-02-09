import { db } from "database/connect.server";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export async function getIdDokumenByIdSubSkill(idSubSkill: string) {
    const res = await db.select({
        idDokumen: mSubSkill.idDokumen,
    })
        .from(mSubSkill)
        .where(eq(mSubSkill.idSubSkill, idSubSkill))

    return res.length > 0 ? res[0].idDokumen : null
}