import { db } from "database/connect";
import { tKuisQuestion } from "database/schema";
import { eq } from "drizzle-orm";

export async function getQuestionsByIdKuis(idKuis: string) {
    const res = await db.query.tKuisQuestion.findMany({
        where: {
            idKuis: idKuis
        },
        with: {
            correctOption: true
        },
    })
    return res
}