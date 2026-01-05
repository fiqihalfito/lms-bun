import { db } from "database/connect";
import { tKuisQuestionOption } from "database/schema";

export async function insertOptions(options: typeof tKuisQuestionOption.$inferInsert[]) {
    await db.insert(tKuisQuestionOption).values(options)
}