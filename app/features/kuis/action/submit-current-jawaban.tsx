import { replace } from "react-router";
import type { Route } from "./+types/submit-current-jawaban";
import { getQuestionByIdKuisQuestion } from "../services/getQuestionByIdQuestion";
import invariant from "tiny-invariant";
import { updateKuisJawabanUser } from "../services/pengerjaan-kuis/updateKuisJawabanUser";
import { dataWithError } from "remix-toast";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";

export async function action({ request, params }: Route.ActionArgs) {

    try {
        const formData = await request.formData()
        const idKuisQuestion = String(formData.get("idKuisQuestion"))
        const jawaban = formData.get("jawaban")
        const jumlahSoal = Number(formData.get("jumlahSoal"))
        const waktuPengerjaanDetik = Number(formData.get("waktuPengerjaanDetik"))

        const questionData = await getQuestionByIdKuisQuestion(idKuisQuestion)
        invariant(questionData.length > 0, "Soal tidak ditemukan")

        const isCorrect = questionData[0].answerOption === jawaban
        const score = isCorrect ? 1 : 0
        await updateKuisJawabanUser(params.idKuisProgress, idKuisQuestion, {
            answer: jawaban ? String(jawaban) : null,
            isCorrect: isCorrect,
            score: score,
            waktuPengerjaanDetik: waktuPengerjaanDetik,
        })

        const nextQuestionNumber = Number(params.questionNumber) + 1
        if (nextQuestionNumber > jumlahSoal) {
            return replace(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/submit`)
        } else {
            return replace(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/question/${nextQuestionNumber}`)
        }
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error)
        console.log(message, constraint)
        return dataWithError({ ok: false }, {
            message: message,
        })
    }

    // return redirect(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/question/${Number(params.questionNumber) + 1}`)

}