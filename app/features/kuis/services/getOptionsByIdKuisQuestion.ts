import { db } from "database/connect"
import { tKuisQuestionOption } from "database/schema"
import { eq } from "drizzle-orm"

export async function getOptionsByIdKuisQuestion(idKuisQuestion: string) {
    const options = await db.select().from(tKuisQuestionOption).where(eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion))
    return options
}