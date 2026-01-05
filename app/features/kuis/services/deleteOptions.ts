import { db } from "database/connect";
import { tKuisQuestionOption } from "database/schema";
import { eq } from "drizzle-orm";

export async function deleteOptions(idKuisQuestion: string) {
    await db.delete(tKuisQuestionOption).where(eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion))
}