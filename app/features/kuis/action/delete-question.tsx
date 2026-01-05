import { dataWithError, dataWithSuccess, redirectWithSuccess } from "remix-toast";
import { deleteOptions } from "../services/deleteOptions";
import { deleteQuestion } from "../services/deleteQuestion";
import type { Route } from "./+types/delete-question";

export async function action({ request, params, context }: Route.ActionArgs) {

    try {
        // delete options first
        await deleteOptions(params.idKuisQuestion)

        // delete question
        await deleteQuestion(params.idKuisQuestion)

        return dataWithSuccess({ ok: true }, "Pertanyaan berhasil dihapus")
    } catch (error) {
        return dataWithError({ ok: false }, "Gagal menghapus pertanyaan")
    }
}