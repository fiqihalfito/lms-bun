import { db } from "database/connect.server";
import { mRole } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class RoleQuery {
  static async findAllRole() {
    const res = await db.select().from(mRole);
    return res;
  }

  static async findRoleNameByIdRole(idRole: string | null) {
    if (!idRole) return null;
    const res = await db
      .select({ namaRole: mRole.namaRole })
      .from(mRole)
      .where(eq(mRole.idRole, idRole));
    return res[0].namaRole;
  }

  static async findRoleByIdUser(idUser: string) {
    const res = await db.query.mUsers.findFirst({
      columns: {
        idRole: true,
      },
      where: {
        idUser: idUser,
      },
    });
    return res?.idRole;
  }
}
