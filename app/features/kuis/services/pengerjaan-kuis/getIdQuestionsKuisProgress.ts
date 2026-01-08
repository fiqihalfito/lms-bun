import { db } from "database/connect"
import { tKuisProgress } from "database/schema"
import { eq } from "drizzle-orm"

export async function getIdQuestionsKuisProgress(idKuisProgress: string) {
    const res = await db.select({ questionSet: tKuisProgress.questionSet }).from(tKuisProgress).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
    const ids = res[0].questionSet
    return ids ? JSON.parse(ids) as string[] : []
}