import { db } from "database/connect.server";
import { mLayanan } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateLayanan(idLayanan: string, namaLayanan: string) {
    await db.update(mLayanan).set({
        namaLayanan: namaLayanan,
    }).where(eq(mLayanan.idLayanan, idLayanan));
}