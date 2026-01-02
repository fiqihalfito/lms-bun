import { db } from "database/connect";
import { tDokumen } from "database/schema";

export async function saveDokumenWithReturn(dokumen: typeof tDokumen.$inferInsert) {
    const newId = await db.insert(tDokumen).values(dokumen).returning({ idDokumen: tDokumen.idDokumen })
    return newId
}