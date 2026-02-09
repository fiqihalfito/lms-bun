import { db } from "database/connect.server";
import { tKuisQuestion } from "database/schema";

export async function insertQuestion(question: typeof tKuisQuestion.$inferInsert) {
    const newQuestion = await db.insert(tKuisQuestion).values(question).returning({ idKuisQuestion: tKuisQuestion.idKuisQuestion })
    return newQuestion
}