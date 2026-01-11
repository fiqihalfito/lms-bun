import { redirect, replace } from "react-router";
import type { Route } from "./+types/submit-current-jawaban";
import { getQuestionByIdKuisQuestion } from "../services/getQuestionByIdQuestion";
import invariant from "tiny-invariant";
import { updateKuisJawabanUser } from "../services/pengerjaan-kuis/updateKuisJawabanUser";
import { dataWithError } from "remix-toast";

export async function action({ request, params }: Route.ActionArgs) {
    try {
        const formData = await request.formData()
        const idKuisQuestion = String(formData.get("idKuisQuestion"))
        const jawaban = String(formData.get("jawaban"))
        const jumlahSoal = Number(formData.get("jumlahSoal"))

        const questionData = await getQuestionByIdKuisQuestion(idKuisQuestion)
        invariant(questionData.length > 0, "Soal tidak ditemukan")

        const isCorrect = questionData[0].answerOption === jawaban
        const score = isCorrect ? 1 : 0
        // const waktuPengerjaanDetik = Number(formData.get("waktuPengerjaanDetik"))
        await updateKuisJawabanUser(params.idKuisProgress, idKuisQuestion, {
            answer: jawaban,
            isCorrect: isCorrect,
            score: score,
            waktuPengerjaanDetik: 0,
        })

        const nextQuestionNumber = Number(params.questionNumber) + 1
        if (nextQuestionNumber > jumlahSoal) {
            return replace(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/submit`)
        } else {
            return replace(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/question/${nextQuestionNumber}`)
        }
    } catch (error) {
        console.log(error)
        return dataWithError({ ok: false }, {
            message: error as string,
        })
    }

    // return redirect(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/question/${Number(params.questionNumber) + 1}`)

}