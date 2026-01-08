import { db } from "database/connect";
import { tKuisJawabanUser } from "database/schema";

export async function saveQuestionsInKuisJawabanUser(idKuisProgress: string, idQuestions: string[]) {
    await db.insert(tKuisJawabanUser).values(idQuestions.map((idQuestion) => ({
        idKuisQuestion: idQuestion,
        idKuisProgress: idKuisProgress,
    }) satisfies typeof tKuisJawabanUser.$inferInsert))
}