import { db } from "database/connect.server";

export async function getTeamDataFromTeamMember(idUser: string) {
    const res = await db.query.mUserProfiles.findMany({
        with: {
            team: true
        },
        where: {
            idUser: idUser
        }
    })
    return res;
}