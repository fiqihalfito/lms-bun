import { db } from "database/connect.server";
import { mTeam, mTeamMember } from "database/schema";
import { eq } from "drizzle-orm";

export async function getIdTeamByIdUser(idUser: string) {
    const res = await db.select({ idTeam: mTeamMember.idTeam }).from(mTeamMember).where(eq(mTeamMember.idUser, idUser))
    return res[0].idTeam
}