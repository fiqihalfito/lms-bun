import { db } from "database/connect";
import { tKuisJawabanUser } from "database/schema";
import { eq } from "drizzle-orm";

export async function getKuisJawabanUserByIdKuisProgress(idKuisProgress: string) {
    const res = await db.select().from(tKuisJawabanUser).where(eq(tKuisJawabanUser.idKuisProgress, idKuisProgress))
    return res
}