import { db } from "database/connect";

export async function getAllQuestionsByIdKuis(idKuis: string) {
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