import { db } from "database/connect.server";
import { mTeam, mTeamMember } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class TeamMutation {
  static async insertTeam(idSubBidang: string, namaTeam: string) {
    await db.insert(mTeam).values({
      namaTeam,
      idSubBidang,
    });
  }

  static async updateTeam(idTeam: string, namaTeam: string) {
    await db
      .update(mTeam)
      .set({
        namaTeam,
      })
      .where(eq(mTeam.idTeam, idTeam));
  }

  static async updateTeamMember(
    idUser: string,
    teamMemberData: typeof mTeamMember.$inferInsert,
  ) {
    await db
      .update(mTeamMember)
      .set(teamMemberData)
      .where(eq(mTeamMember.idUser, idUser));
  }
}
