import { dataWithError, dataWithSuccess } from "remix-toast";
import type { Route } from "./+types/delete-question";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
// import { ManageKuisService } from "../services/ManageKuisService";
import { ManageKuisService } from "../services/ManageKuisService";

export async function action({ request, params, context }: Route.ActionArgs) {
  try {
    // await db.transaction(async (tx) => {
    //   // delete jawaban user first
    //   await deleteKuisJawabanUserByIdKuisQuestion(params.idKuisQuestion, tx);

    //   // update kuis progress (too advanced) otherwise make attempt kuis
    //   // await updateKuisProgress()

    //   // delete options
    //   await deleteOptions(params.idKuisQuestion, tx);

    //   // delete question
    //   await deleteQuestion(params.idKuisQuestion, tx); // gagal karena user sudah buat jawaban di pertanyaan ini
    // });
    //
    await ManageKuisService.deleteQuestion(params.idKuisQuestion);

    return dataWithSuccess(
      { ok: true },
      {
        message: "Pertanyaan berhasil dihapus",
        description: "Kuis terkunci",
      },
    );
  } catch (error) {
    const { message, constraint } = getDbErrorMessage(error);
    console.log(message, constraint);
    return dataWithError({ ok: false }, "Gagal menghapus pertanyaan");
  }
}
