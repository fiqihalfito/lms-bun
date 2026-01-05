import { db } from "database/connect";
import { tKuisQuestion } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateQuestion(idKuisQuestion: string, question: Partial<typeof tKuisQuestion.$inferInsert>) {
    await db.update(tKuisQuestion).set(question).where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion))

}