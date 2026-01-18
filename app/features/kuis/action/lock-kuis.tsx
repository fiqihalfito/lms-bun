import { dataWithSuccess, dataWithWarning } from "remix-toast";
import { updateKuisMetaData } from "../services/updateKuisMetaData";
import type { Route } from "./+types/lock-kuis";
import { getJumlahQuestionsByIdKuis } from "../services/getJumlahQuestionsByIdKuis";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData()
    const isLocked = formData.get("locked") === "true"

    // jika jumlah soal 0, cegah kuis terpublish
    const jumlahQuestions = await getJumlahQuestionsByIdKuis(params.idKuis)
    if (jumlahQuestions === 0) {
        await updateKuisMetaData(params.idKuis, {
            isLocked: true,
        })
        return dataWithWarning({ isLocked: true }, {
            message: "Belum ada soal",
            description: "Kuis masih terkunci, tambahkan soal"
        })
    }

    // update status kuis
    await updateKuisMetaData(params.idKuis, {
        isLocked: isLocked,
    })

    if (isLocked) {
        return dataWithWarning({ isLocked: isLocked }, {
            message: "Kuis di kunci",
        })
    } else {
        return dataWithSuccess({ isLocked: isLocked }, {
            message: "Kuis berhasil di publish",
        })
    }
}