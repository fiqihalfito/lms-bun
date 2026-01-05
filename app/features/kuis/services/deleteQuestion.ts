import { db } from "database/connect";
import { tKuisQuestion } from "database/schema";
import { eq } from "drizzle-orm";

export async function deleteQuestion(idKuisQuestion: string) {
    await db.delete(tKuisQuestion).where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion))
}