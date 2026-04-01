import { db } from "database/connect.server";
import { mTeamMember } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateTeamMember(idUser: string, teamMemberData: typeof mTeamMember.$inferInsert) {
    await db.update(mTeamMember).set(teamMemberData).where(eq(mTeamMember.idUser, idUser));
}