import { db } from "database/connect";
import { tKuisQuestion } from "database/schema";
import { eq } from "drizzle-orm";

export async function getQuestionsByIdKuis(idKuis: string) {
    const res = await db.select().from(tKuisQuestion).where(eq(tKuisQuestion.idKuis, idKuis))
    return res
}