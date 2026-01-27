import { db } from "database/connect";
import { mSkill, mSubSkill } from "database/schema";
import { count, eq } from "drizzle-orm";

export async function getSkillByIdPicSubSkill(idPic: string) {
    // const res = await db.query.mSubSkill.findMany({
    //     where: {
    //         idPic: idPic
    //     },
    //     with: {
    //         skill: true
    //     }
    // })

    // const mappedSkills = res.map((ss) => ss.skill)
    // const uniqueSkills = Array.from(
    //     new Map(mappedSkills.map(item => [item?.idSkill, item])).values()
    // );
    const uniqueSkills = await db.select({
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        jumlahSubkill: count(mSubSkill.idSubSkill),
        jumlahUpload: count(mSubSkill.idDokumen)
    })
        .from(mSkill)
        .innerJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
        .where(eq(mSubSkill.idPic, idPic))
        .groupBy(mSkill.idSkill, mSkill.namaSkill)
        .orderBy(mSkill.namaSkill)


    return uniqueSkills
}