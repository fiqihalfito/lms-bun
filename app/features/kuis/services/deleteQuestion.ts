import { db } from "database/connect";
import { tKuisQuestion } from "database/schema";
import type { Tx } from "database/types";
import { eq } from "drizzle-orm";



export async function deleteQuestion(idKuisQuestion: string, tx?: Tx) {
    if (tx) {
        await tx.delete(tKuisQuestion).where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion))
    } else {
        await db.delete(tKuisQuestion).where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion))
    }
}