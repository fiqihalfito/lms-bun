import { tKuisProgress } from "database/schema";
import { db } from "database/connect";
import { eq } from "drizzle-orm";
import type { Tx } from "database/types";

export async function updateKuisProgress(idKuisProgress: string, kuisProgress: Partial<typeof tKuisProgress.$inferInsert>, tx?: Tx) {
    if (tx) {
        await tx.update(tKuisProgress).set(kuisProgress).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
    } else {
        await db.update(tKuisProgress).set(kuisProgress).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
    }
}