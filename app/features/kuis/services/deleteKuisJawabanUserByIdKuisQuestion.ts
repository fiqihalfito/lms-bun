import { db } from "database/connect.server";
import { tKuisJawabanUser } from "database/schema";
import type { Tx } from "database/types";
import { eq } from "drizzle-orm";

export async function deleteKuisJawabanUserByIdKuisQuestion(idKuisQuestion: string, tx?: Tx) {
    if (tx) {
        await tx.delete(tKuisJawabanUser).where(eq(tKuisJawabanUser.idKuisQuestion, idKuisQuestion))
    } else {
        await db.delete(tKuisJawabanUser).where(eq(tKuisJawabanUser.idKuisQuestion, idKuisQuestion))
    }
}