import { redirect } from "react-router";
import type { Route } from "./+types/submit-current-jawaban";

export async function action({ request, params }: Route.ActionArgs) {
    const formData = await request.formData()
    const idKuisQuestion = String(formData.get("idKuisQuestion"))
    const jawaban = String(formData.get("jawaban"))

    console.log(idKuisQuestion, jawaban, params.questionNumber);

    return {}

    // return redirect(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/question/${Number(params.questionNumber) + 1}`)

}