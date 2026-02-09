import { db } from "database/connect.server";
import { mSkill, mSubSkill } from "database/schema";
import { and, count, eq } from "drizzle-orm";

export async function getSkillProgressDetailByIdSkill(idSkill: string, idPic: string) {
    const res = await db.select({
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        jumlahSubkill: count(mSubSkill.idSubSkill),
        jumlahUpload: count(mSubSkill.idDokumen)
    })
        .from(mSkill)
        .innerJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
        .where(and(eq(mSubSkill.idPic, idPic), eq(mSkill.idSkill, idSkill)))
        .groupBy(mSkill.idSkill, mSkill.namaSkill)
        .orderBy(mSkill.namaSkill)
        .limit(1)

    return res
}