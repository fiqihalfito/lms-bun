import { db } from "database/connect";
import { mRole } from "database/schema";
import { eq } from "drizzle-orm";

export async function getRoleNameByIdRole(idRole: string | null) {
    if (!idRole) return null;
    const res = await db.select({ namaRole: mRole.namaRole }).from(mRole).where(eq(mRole.idRole, idRole));
    return res[0].namaRole;
}