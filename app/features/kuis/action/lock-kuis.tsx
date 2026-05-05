import { dataWithSuccess, dataWithWarning } from "remix-toast";
import type { Route } from "./+types/lock-kuis";
import { ManageKuisService } from "../services/ManageKuisService";

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const isLocked = formData.get("locked") === "true";

  // jika jumlah soal 0, cegah kuis terpublish
  // const jumlahQuestions = await getJumlahQuestionsByIdKuis(params.idKuis)
  // if (jumlahQuestions === 0) {
  //     await ManageKuisService.updateKuisMetaData(params.idKuis, {
  //         isLocked: true,
  //     })
  //     return dataWithWarning({ isLocked: true }, {
  //         message: "Belum ada soal",
  //         description: "Kuis masih terkunci, tambahkan soal"
  //     })
  // }

  // // update status kuis
  // await updateKuisMetaData(params.idKuis, {
  //     isLocked: isLocked,
  // })
  const result = await ManageKuisService.lockKuis(params.idKuis, isLocked);
  if (!result.success) {
    return dataWithWarning(
      { isLocked: true },
      {
        message: "Belum ada soal",
        description: "Kuis masih terkunci, tambahkan soal",
      },
    );
  }

  if (isLocked) {
    return dataWithWarning(
      { isLocked: isLocked },
      {
        message: "Kuis di kunci",
      },
    );
  } else {
    return dataWithSuccess(
      { isLocked: isLocked },
      {
        message: "Kuis berhasil di publish",
      },
    );
  }
}
