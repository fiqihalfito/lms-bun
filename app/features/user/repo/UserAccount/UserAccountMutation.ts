import { db } from "database/connect.server";
import { mUsers } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class UserAccountMutation {
  static async insertUserAccount(userAccount: typeof mUsers.$inferInsert) {
    const newIdUser = await db
      .insert(mUsers)
      .values(userAccount)
      .returning({ idUser: mUsers.idUser });
    return newIdUser;
  }

  static async updateUserAccount(
    idUser: string,
    userAccount: typeof mUsers.$inferInsert,
  ) {
    await db.update(mUsers).set(userAccount).where(eq(mUsers.idUser, idUser));
  }
}
