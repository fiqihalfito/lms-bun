import { db } from "database/connect.server";
import { tKuisQuestionOption } from "database/schema";
import { and, eq } from "drizzle-orm";

export async function updateOption(idKuisQuestion: string, optionData: { option: string, optionDesc: string }) {
    await db.update(tKuisQuestionOption).set(optionData)
        .where(and(eq(tKuisQuestionOption.option, optionData.option), eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion)))
}