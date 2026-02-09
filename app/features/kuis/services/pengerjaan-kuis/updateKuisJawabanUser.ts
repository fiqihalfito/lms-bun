import { db } from "database/connect.server";
import { tKuisJawabanUser } from "database/schema";
import { and, eq } from "drizzle-orm";

export async function updateKuisJawabanUser(idKuisProgress: string, idKuisQuestion: string, kuisJawabanUser: typeof tKuisJawabanUser.$inferInsert) {
    await db.update(tKuisJawabanUser).set(kuisJawabanUser).where(and(
        eq(tKuisJawabanUser.idKuisProgress, idKuisProgress),
        eq(tKuisJawabanUser.idKuisQuestion, idKuisQuestion)
    ))
}