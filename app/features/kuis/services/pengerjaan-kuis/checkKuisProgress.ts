import { db } from "database/connect";
import { tKuisProgress } from "database/schema";
import { and, eq } from "drizzle-orm";

export async function getKuisProgress(idKuis: string, idUser: string) {
    const res = await db.select({ idKuisProgress: tKuisProgress.idKuisProgress })
        .from(tKuisProgress)
        .where(and(eq(tKuisProgress.idKuis, idKuis), eq(tKuisProgress.idUser, idUser)))
    return res
}