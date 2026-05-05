import { db } from "database/connect.server";
import { mUsers } from "database/schema";
import { eq, getColumns } from "drizzle-orm";

export abstract class UserAccountQuery {
  static async findUserAccountByIdUser(idUser: string) {
    const { password, ...rest } = getColumns(mUsers);
    const res = await db
      .select({
        ...rest,
      })
      .from(mUsers)
      .where(eq(mUsers.idUser, idUser));

    return res;
  }

  static async findUserByEmail(email: string) {
    const res = await db.select().from(mUsers).where(eq(mUsers.email, email));

    return res;
  }
}
