import { db } from "database/connect.server";
import { tKuisProgress } from "database/schema";
import { eq } from "drizzle-orm";

export async function getKuisProgressById(idKuisProgress: string) {
    const res = await db.select().from(tKuisProgress).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
    return res
}