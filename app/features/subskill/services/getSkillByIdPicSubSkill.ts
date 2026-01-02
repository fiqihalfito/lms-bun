import { db } from "database/connect";

export async function getSkillByIdPicSubSkill(idPic: string) {
    const res = await db.query.mSubSkill.findMany({
        where: {
            idPic: idPic
        },
        with: {
            skill: true
        }
    })

    const mappedSkills = res.map((ss) => ss.skill)
    const uniqueSkills = Array.from(
        new Map(mappedSkills.map(item => [item?.idSkill, item])).values()
    );

    return uniqueSkills
}