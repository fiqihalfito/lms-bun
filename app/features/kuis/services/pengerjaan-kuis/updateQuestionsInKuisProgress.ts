import { db } from "database/connect.server";
import { tKuisProgress } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateQuestionsInKuisProgress(idKuisProgress: string, idQuestions: string[]) {
    await db.update(tKuisProgress).set({
        questionSet: JSON.stringify(idQuestions),
        jumlahSoal: idQuestions.length,
    }).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
}