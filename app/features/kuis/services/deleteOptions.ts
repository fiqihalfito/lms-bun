import { db } from "database/connect.server";
import { tKuisQuestionOption } from "database/schema";
import { eq } from "drizzle-orm";
import type { Tx } from "database/types";



export async function deleteOptions(idKuisQuestion: string, tx?: Tx) {
    if (tx) {
        await tx.delete(tKuisQuestionOption).where(eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion))
    } else {
        await db.delete(tKuisQuestionOption).where(eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion))
    }
}