import { db } from "database/connect.server";
import { tKuisQuestion } from "database/schema";
import { eq } from "drizzle-orm";

export async function getQuestionByIdKuisQuestion(idKuisQuestion: string) {
    const question = await db.select().from(tKuisQuestion).where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion))
    return question
}