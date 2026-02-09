import { db } from "database/connect.server"
import { tDokumen } from "database/schema"
import { eq } from "drizzle-orm"

export async function updateDokumen(dokumen: typeof tDokumen.$inferInsert, idDokumen: string) {
    await db.update(tDokumen).set(dokumen).where(eq(tDokumen.idDokumen, idDokumen))
}