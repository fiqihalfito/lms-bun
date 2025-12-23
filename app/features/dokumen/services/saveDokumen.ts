import { db } from "database/connect";
import { tDokumen } from "database/schema";

export async function saveDokumen(dokumen: typeof tDokumen.$inferInsert) {
    const newDokumen = await db.insert(tDokumen).values(dokumen).returning({ idDokumen: tDokumen.idDokumen })
    return newDokumen
}