import { db } from "database/connect";
import { tKuisQuestion } from "database/schema";
import { eq } from "drizzle-orm";

export async function getJumlahQuestionsByIdKuis(idKuis: string) {
    const jumlahQuestions = await db.select().from(tKuisQuestion).where(eq(tKuisQuestion.idKuis, idKuis))
    return jumlahQuestions.length
}