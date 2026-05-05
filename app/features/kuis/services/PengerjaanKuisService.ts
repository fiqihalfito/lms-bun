import { shuffle } from "@/lib/utils";
import { PengerjaanKuisQuery } from "../repo/pengerjaan-kuis/PengerjaanKuisQuery";
import { PengerjaanKuisMutation } from "../repo/pengerjaan-kuis/PengerjaanKuisMutation";
import { sql } from "drizzle-orm";
import invariant from "tiny-invariant";
import { ManageKuisQuery } from "../repo/manage-kuis/ManageKuisQuery";
import { ManageKuisMutation } from "../repo/manage-kuis/ManageKuisMutation";

export abstract class PengerjaanKuisService {
  static async startKuis(idKuis: string, idUser: string) {
    // klik mulai kuis berarti reset semua questions
    // randomize questions
    const idQuestions =
      await PengerjaanKuisQuery.findIdQuestionsByIdKuis(idKuis);
    const randomQuestions = shuffle(
      idQuestions.map((question) => question.idKuisQuestion),
    );

    // cek apakah pernah kuis progress
    const kuisProgress =
      await PengerjaanKuisQuery.findIdKuisProgressByIdKuisIdUser(
        idKuis,
        idUser,
      );
    let idKuisProgress: string | null =
      kuisProgress.length > 0 ? kuisProgress[0].idKuisProgress : null;
    if (idKuisProgress) {
      // reset progress and jawaban user
      await PengerjaanKuisMutation.deleteKuisJawabanUser(idKuisProgress);
      await PengerjaanKuisMutation.updateKuisProgress(idKuisProgress, {
        totalScore: 0,
        jumlahBenar: 0,
        jumlahSoal: 0,
        completedAt: null,
        totalWaktuPengerjaanDetik: 0,
        startedAt: sql`now()` as unknown as string,
        questionSet: "[]",
      });
    } else {
      // buat progress baru
      idKuisProgress = await PengerjaanKuisMutation.insertKuisProgress({
        idKuis: idKuis,
        idUser: idUser,
        completedAt: null,
        jumlahBenar: 0,
        jumlahSoal: 0,
        totalScore: 0,
        totalWaktuPengerjaanDetik: 0,
        startedAt: sql`now()` as unknown as string,
      });
    }

    // semua soal baru kalau mulai kuis
    // update question set dan jumlah soal di pengerjaan kuis progress
    await PengerjaanKuisMutation.updateKuisProgress(idKuisProgress, {
      questionSet: JSON.stringify(randomQuestions),
      jumlahSoal: idQuestions.length,
    });
    await PengerjaanKuisMutation.insertQuestionsInKuisJawabanUser(
      idKuisProgress,
      randomQuestions,
    );

    return idKuisProgress;
  }

  static async getOneQuestionAndOptionsByItsOrder(
    idKuisProgress: string,
    questionNumber: number,
  ) {
    const idQuestions =
      await PengerjaanKuisQuery.findIdQuestionsKuisProgress(idKuisProgress);
    invariant(idQuestions.length > 0, "Tidak ada soal");
    // ambil semua soal
    const idKuisQuestion = idQuestions[Number(questionNumber) - 1];
    invariant(idKuisQuestion, "Soal tidak ditemukan");
    const question =
      await PengerjaanKuisQuery.findQuestionByIdKuis(idKuisQuestion);

    invariant(question, "Soal tidak ditemukan");
    const options = shuffle(question.options);

    // for accesorries
    const jumlahSoal = idQuestions.length;

    return { question, options, jumlahSoal };
  }

  static async getNamaSubskillByIdKuis(idKuis: string) {
    const subskill = await PengerjaanKuisQuery.findNamaSubskillByIdKuis(idKuis);
    const namaSubskill = subskill.length > 0 ? subskill[0].namaSubSkill : "";
    return namaSubskill;
  }

  static async getKuisProgressById(idKuisProgress: string) {
    const kuisProgress =
      await PengerjaanKuisQuery.findKuisProgressById(idKuisProgress);
    invariant(kuisProgress.length > 0, "Tidak ada progress kuis");
    return kuisProgress[0];
  }

  static async submitCurrentJawaban(
    formData: FormData,
    idKuisProgress: string,
  ) {
    const idKuisQuestion = String(formData.get("idKuisQuestion"));
    const jawaban = formData.get("jawaban");
    const waktuPengerjaanDetik = Number(formData.get("waktuPengerjaanDetik"));

    const questionData =
      await ManageKuisQuery.findQuestionByIdKuisQuestion(idKuisQuestion);
    invariant(questionData.length > 0, "Soal tidak ditemukan");

    const isCorrect = questionData[0].answerOption === jawaban;
    const score = isCorrect ? 1 : 0;
    await PengerjaanKuisMutation.updateKuisJawabanUser(
      idKuisProgress,
      idKuisQuestion,
      {
        answer: jawaban ? String(jawaban) : null,
        isCorrect: isCorrect,
        score: score,
        waktuPengerjaanDetik: waktuPengerjaanDetik,
      },
    );
  }

  static async submitKuis(idKuisProgress: string) {
    const jawabanUserData =
      await PengerjaanKuisQuery.findKuisJawabanUserByIdKuisProgress(
        idKuisProgress,
      );

    const totalScore = jawabanUserData.reduce(
      (total, item) => total + (item.score ?? 0),
      0,
    );

    const jumlahBenar = jawabanUserData.reduce(
      (total, item) => total + (item.isCorrect ? 1 : 0),
      0,
    );

    const totalWaktuPengerjaan = jawabanUserData.reduce(
      (total, item) => total + (item?.waktuPengerjaanDetik ?? 0),
      0,
    );

    await ManageKuisMutation.updateKuisProgress(idKuisProgress, {
      totalScore: totalScore,
      jumlahBenar: jumlahBenar,
      totalWaktuPengerjaanDetik: totalWaktuPengerjaan,
      completedAt: sql`now()` as unknown as string,
    });
  }
}
