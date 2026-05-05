import type { Route } from "./+types/submit-form-make-kuis";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { ManageKuisService } from "../services/ManageKuisService";

export async function action({ request, params, context }: Route.ActionArgs) {
  const formData = await request.formData();

  const { success, message, description, payload } =
    await ManageKuisService.submitMakeKuis(formData, params.idKuis);

  if (success) {
    return redirectWithSuccess(
      `/app/pic-subskill/skill/${params.idSkill}/subskill/${params.idSubSkill}/make-kuis`,
      { message, description },
    );
  } else {
    return dataWithError(payload, message);
  }
  // const submission = parseWithZod(formData, { schema: makeKuisSchema });

  // if (submission.status !== "success") {
  //   return dataWithError(submission.reply(), "Data yang dikirim error");
  // }

  // // cek kalau ada idQuestion, berarti edit, instead insert
  // const idKuisQuestion = formData.get("idKuisQuestion");

  // if (idKuisQuestion) {
  //   // edit mode

  //   // update question first
  //   await updateQuestion(idKuisQuestion as string, {
  //     question: submission.value.question,
  //     answerOption: submission.value.answerOption,
  //     waktuPengerjaanDetik: submission.value.waktuPengerjaanDetik,
  //     idKuis: params.idKuis,
  //     updated_at: sql`now()` as unknown as string,
  //   });

  //   // update option
  //   for (const [key, value] of Object.entries(submission.value.options)) {
  //     await updateOption(idKuisQuestion as string, {
  //       option: key,
  //       optionDesc: value,
  //     });
  //   }

  //   return redirectWithSuccess(
  //     `/app/pic-subskill/skill/${params.idSkill}/subskill/${params.idSubSkill}/make-kuis`,
  //     "Soal berhasil diupdate",
  //   );
  // } else {
  //   // insert mode
  //   const newQuestion = await insertQuestion({
  //     question: submission.value.question,
  //     answerOption: submission.value.answerOption,
  //     idKuis: params.idKuis,
  //     updated_at: sql`now()` as unknown as string,
  //   });

  //   // insert option
  //   const newOptions = Object.entries(submission.value.options).map(
  //     ([key, value]) => ({
  //       option: key,
  //       optionDesc: value,
  //       idKuisQuestion: newQuestion[0].idKuisQuestion,
  //     }),
  //   ) satisfies (typeof tKuisQuestionOption.$inferInsert)[];
  //   await insertOptions(newOptions);

  //   // mode kuis terkunci kalau insert
  //   await updateKuisMetaData(params.idKuis, {
  //     isLocked: true,
  //   });

  //   return redirectWithSuccess(
  //     `/app/pic-subskill/skill/${params.idSkill}/subskill/${params.idSubSkill}/make-kuis`,
  //     {
  //       message: "Soal berhasil ditambahkan",
  //       description: "Kuis terkunci",
  //     },
  //   );
  // }
}
