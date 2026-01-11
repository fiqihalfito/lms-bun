import { db } from "database/connect";
import { tKuisJawabanUser } from "database/schema";

export async function saveQuestionsInKuisJawabanUser(idKuisProgress: string, idQuestions: string[]) {
    await db.insert(tKuisJawabanUser).values(idQuestions.map((idQuestion) => ({
        idKuisQuestion: idQuestion,
        idKuisProgress: idKuisProgress,
        // answer: null, akan diupdate saat submit current soal
        isCorrect: false,
        score: 0,
        waktuPengerjaanDetik: 0,
    }) satisfies typeof tKuisJawabanUser.$inferInsert))
}