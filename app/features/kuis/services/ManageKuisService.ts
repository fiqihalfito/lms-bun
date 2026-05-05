import { SubskillService } from "@/features/subskill/services/SubskillService";
import { ManageKuisMutation } from "../repo/manage-kuis/ManageKuisMutation";
import { ManageKuisQuery } from "../repo/manage-kuis/ManageKuisQuery";
import invariant from "tiny-invariant";
import { db } from "database/connect.server";
import { makeKuisSchema } from "../schema/makeKuisSchema";
import { parseWithZod } from "@conform-to/zod/v4";
import { sql } from "drizzle-orm";
import type { tKuisQuestionOption } from "database/schema";

export abstract class ManageKuisService {
  static async makeKuis(idSubSkill: string) {
    // periksa dulu idkuis di msubskill
    let subskill = await SubskillService.getSubskillByIdWithSkill(idSubSkill);

    // jika tidak ada, insert tKuis
    let idKuis = subskill.idKuis;
    if (!idKuis) {
      const newKuis = await ManageKuisMutation.insertKuis();

      idKuis = newKuis[0].idKuis;
      await SubskillService.editSubskill(idSubSkill, {
        idKuis: idKuis,
      });
    }

    // lalu return semua question berdasarkan idkuis yang didapat
    const questions = await ManageKuisQuery.findAllQuestionsByIdKuis(idKuis);
    const kuisMetaData = await ManageKuisQuery.findKuisMetaDataByIdKuis(idKuis);
    invariant(kuisMetaData.length > 0, "kuis tidak menemukan metadata");

    return {
      questions,
      kuisMetaData: kuisMetaData[0],
      subskill,
      idKuis,
    };
  }

  static async getQuestionDataByIdKuis(idKuisQuestion: string) {
    // for default values
    const question =
      await ManageKuisQuery.findQuestionByIdKuisQuestion(idKuisQuestion);
    invariant(question.length > 0, "Question not found");

    const options =
      await ManageKuisQuery.findOptionsByIdKuisQuestion(idKuisQuestion);
    // invariant(options.length > 0, "Options not found")

    return {
      question: question[0],
      options,
    };
  }

  static async deleteQuestion(idKuisQuestion: string) {
    await db.transaction(async (tx) => {
      // delete jawaban user first
      await ManageKuisMutation.deleteKuisJawabanUserByIdKuisQuestion(
        idKuisQuestion,
        tx,
      );

      // update kuis progress (too advanced) otherwise make attempt kuis
      // await updateKuisProgress()

      // delete options
      await ManageKuisMutation.deleteOptions(idKuisQuestion, tx);

      // delete question
      await ManageKuisMutation.deleteQuestion(idKuisQuestion, tx); // gagal karena user sudah buat jawaban di pertanyaan ini
    });
  }

  static async lockKuis(idKuis: string, isLocked: boolean) {
    // jika jumlah soal 0, cegah kuis terpublish
    const jumlahQuestions =
      await ManageKuisQuery.findJumlahQuestionsByIdKuis(idKuis);
    if (jumlahQuestions === 0) {
      await ManageKuisMutation.updateKuisMetaData(idKuis, {
        isLocked: true,
      });
      return { success: false };
    }

    // update status kuis
    await ManageKuisMutation.updateKuisMetaData(idKuis, {
      isLocked: isLocked,
    });

    return { success: true };
  }

  static async submitMakeKuis(formData: FormData, idKuis: string) {
    const submission = parseWithZod(formData, { schema: makeKuisSchema });

    if (submission.status !== "success") {
      // return dataWithError(submission.reply(), "Data yang dikirim error");
      return {
        success: false,
        message: "Data yang dikirim error",
        payload: submission.reply(),
      };
    }

    // cek kalau ada idQuestion, berarti edit, instead insert
    const idKuisQuestion = formData.get("idKuisQuestion");

    if (idKuisQuestion) {
      // edit mode

      // update question first
      await ManageKuisMutation.updateQuestion(idKuisQuestion as string, {
        question: submission.value.question,
        answerOption: submission.value.answerOption,
        waktuPengerjaanDetik: submission.value.waktuPengerjaanDetik,
        idKuis: idKuis,
        updated_at: sql`now()` as unknown as string,
      });

      // update option
      for (const [key, value] of Object.entries(submission.value.options)) {
        await ManageKuisMutation.updateOption(idKuisQuestion as string, {
          option: key,
          optionDesc: value,
        });
      }
      return { success: true, message: "Soal berhasil diupdate" };
    } else {
      // insert mode
      const newQuestion = await ManageKuisMutation.insertQuestion({
        question: submission.value.question,
        answerOption: submission.value.answerOption,
        idKuis: idKuis,
        updated_at: sql`now()` as unknown as string,
      });

      // insert option
      const newOptions = Object.entries(submission.value.options).map(
        ([key, value]) => ({
          option: key,
          optionDesc: value,
          idKuisQuestion: newQuestion[0].idKuisQuestion,
        }),
      ) satisfies (typeof tKuisQuestionOption.$inferInsert)[];
      await ManageKuisMutation.insertOptions(newOptions);

      // mode kuis terkunci kalau insert
      await ManageKuisMutation.updateKuisMetaData(idKuis, {
        isLocked: true,
      });

      return {
        success: true,
        message: "Soal berhasil ditambahkan",
        description: "Kuis terkunci",
      };
    }
  }
}
