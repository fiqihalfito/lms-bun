import { userContext } from "@/lib/context";
import type { Route } from "./+types/start";
import { redirectWithInfo } from "remix-toast";
import { PengerjaanKuisService } from "@/features/kuis/services/PengerjaanKuisService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext);

  // klik mulai kuis berarti reset semua questions
  // randomize questions
  // const idQuestions = await getIdQuestionsByIdKuis(params.idKuis)
  // const randomQuestions = shuffle(idQuestions.map((question) => question.idKuisQuestion))

  // // cek apakah pernah kuis progress
  // const kuisProgress = await getKuisProgress(params.idKuis, user.idUser)
  // let idKuisProgress: string | null = kuisProgress.length > 0 ? kuisProgress[0].idKuisProgress : null
  // if (idKuisProgress) {
  //     // reset progress
  //     await resetKuisProgress(idKuisProgress)
  //     await resetKuisJawabanUser(idKuisProgress)
  // } else {
  //     // buat progress baru
  //     idKuisProgress = await createKuisProgress(params.idKuis, user.idUser)
  // }

  // // semua soal baru kalau mulai kuis
  // await updateQuestionsInKuisProgress(idKuisProgress, randomQuestions)
  // await saveQuestionsInKuisJawabanUser(idKuisProgress, randomQuestions)
  const idKuisProgress = await PengerjaanKuisService.startKuis(
    params.idKuis,
    user.idUser,
  );

  return redirectWithInfo(
    `/app/kuis/${params.idKuis}/progress/${idKuisProgress}/question/1`,
    "Kuis Dimulai",
  );
}
