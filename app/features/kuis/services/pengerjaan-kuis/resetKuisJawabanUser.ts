import { db } from "database/connect.server";
import { tKuisJawabanUser } from "database/schema";
import { eq } from "drizzle-orm";

export async function resetKuisJawabanUser(idKuisProgress: string) {
    await db.delete(tKuisJawabanUser).where(eq(tKuisJawabanUser.idKuisProgress, idKuisProgress))
}