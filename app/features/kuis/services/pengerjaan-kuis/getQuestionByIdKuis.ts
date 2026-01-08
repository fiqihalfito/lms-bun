import { db } from "database/connect"

export async function getQuestionByIdKuis(idKuisQuestion: string) {
    const res = await db.query.tKuisQuestion.findFirst({
        where: {
            idKuisQuestion: idKuisQuestion
        },
        with: {
            options: true
        },
        columns: {
            answerOption: false
        }
    })
    return res
}