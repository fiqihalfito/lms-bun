import { db } from "database/connect.server";
import { mTeam, mTeamMember } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class TeamQuery {
  static async findByid(idTeam: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idTeam, idTeam));
    return res;
  }

  static async findAllTeamByIdSubBidang(idSubBidang: string) {
    const res = await db
      .select()
      .from(mTeam)
      .where(eq(mTeam.idSubBidang, idSubBidang));
    return res;
  }

  static async findIdTeamByIdUser(idUser: string) {
    const res = await db
      .select({ idTeam: mTeamMember.idTeam })
      .from(mTeamMember)
      .where(eq(mTeamMember.idUser, idUser));
    return res[0].idTeam;
  }
}
