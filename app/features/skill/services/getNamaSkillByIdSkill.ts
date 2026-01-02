import { db } from "database/connect";

export async function getNamaSkillByIdSkill(idSkill: string) {
    const res = await db.query.mSkill.findFirst({
        where: {
            idSkill: idSkill
        },
        columns: {
            namaSkill: true
        }
    })

    return res?.namaSkill
}