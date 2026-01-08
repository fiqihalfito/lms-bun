import { db } from "database/connect";
import { tKuis } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateKuisMetaData(idKuis: string, kuis: typeof tKuis.$inferInsert) {
    await db.update(tKuis).set(kuis).where(eq(tKuis.idKuis, idKuis))
}