import { db } from "database/connect";
import { tKuisQuestion } from "database/schema";
import { eq } from "drizzle-orm";

export async function getIdQuestionsByIdKuis(idKuis: string) {
    const ids = await db.select({ idKuisQuestion: tKuisQuestion.idKuisQuestion }).from(tKuisQuestion).where(eq(tKuisQuestion.idKuis, idKuis))
    return ids
}