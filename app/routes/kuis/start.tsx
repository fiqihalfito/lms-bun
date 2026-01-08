import { userContext } from "@/lib/context";
import type { Route } from "./+types/start";
import { getKuisProgress } from "@/features/kuis/services/pengerjaan-kuis/checkKuisProgress";
import { resetKuisProgress } from "@/features/kuis/services/pengerjaan-kuis/resetKuisProgress";
import { createKuisProgress } from "@/features/kuis/services/pengerjaan-kuis/createKuisProgress";
import { redirectWithInfo } from "remix-toast";
import { resetKuisJawabanUser } from "@/features/kuis/services/pengerjaan-kuis/resetKuisJawabanUser";
import { getIdQuestionsByIdKuis } from "@/features/kuis/services/pengerjaan-kuis/getIdQuestionsByIdKuis";
import { shuffle } from "@/lib/utils";
import { updateQuestionsInKuisProgress } from "@/features/kuis/services/pengerjaan-kuis/updateQuestionsInKuisProgress";
import { saveQuestionsInKuisJawabanUser } from "@/features/kuis/services/pengerjaan-kuis/saveQuestionsInKuisJawabanUser";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)

    // klik mulai kuis berarti reset semua questions
    // randomize questions
    const idQuestions = await getIdQuestionsByIdKuis(params.idKuis)
    const randomQuestions = shuffle(idQuestions.map((question) => question.idKuisQuestion))

    // cek apakah pernah kuis progress
    const kuisProgress = await getKuisProgress(params.idKuis, user.idUser)
    let idKuisProgress: string | null = kuisProgress.length > 0 ? kuisProgress[0].idKuisProgress : null
    if (idKuisProgress) {
        // reset progress
        await resetKuisProgress(idKuisProgress)
        await resetKuisJawabanUser(idKuisProgress)
    } else {
        // buat progress baru
        idKuisProgress = await createKuisProgress(params.idKuis, user.idUser)
    }

    // semua soal baru kalau mulai kuis
    await updateQuestionsInKuisProgress(idKuisProgress, randomQuestions)
    await saveQuestionsInKuisJawabanUser(idKuisProgress, randomQuestions)

    return redirectWithInfo(`/app/kuis/${params.idKuis}/progress/${idKuisProgress}/question/1`, "Kuis Dimulai")
}