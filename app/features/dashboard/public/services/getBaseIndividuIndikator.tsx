import { db } from "database/connect.server";

export async function getBaseIndividuIndikator() {
    const res = await db.query.mTeam.findMany({
        with: {
            skill: {
                with: {
                    subSkill: true
                }
            }
        }
    })

    return res
}