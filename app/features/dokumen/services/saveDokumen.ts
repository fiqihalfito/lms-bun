import { db } from "database/connect.server";
import { tDokumen } from "database/schema";

export async function saveDokumen(dokumen: typeof tDokumen.$inferInsert) {
    await db.insert(tDokumen).values(dokumen)
}