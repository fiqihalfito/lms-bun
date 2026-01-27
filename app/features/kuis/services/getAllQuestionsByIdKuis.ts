import { db } from "database/connect";
import { sql } from "drizzle-orm";

export async function getAllQuestionsByIdKuis(idKuis: string) {
    const res = await db.query.tKuisQuestion.findMany({
        where: {
            idKuis: idKuis
        },
        orderBy: (t) => sql`${t.updated_at} desc nulls last`,
        with: {
            correctOption: true
        },
    })
    return res
}