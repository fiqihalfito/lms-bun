import { db } from "database/connect.server";
import {
  mSubSkill,
  tKuisJawabanUser,
  tKuisProgress,
  tKuisQuestion,
} from "database/schema";
import { and, eq } from "drizzle-orm";

export abstract class PengerjaanKuisQuery {
  static async findIdKuisProgressByIdKuisIdUser(
    idKuis: string,
    idUser: string,
  ) {
    const res = await db
      .select({ idKuisProgress: tKuisProgress.idKuisProgress })
      .from(tKuisProgress)
      .where(
        and(eq(tKuisProgress.idKuis, idKuis), eq(tKuisProgress.idUser, idUser)),
      );
    return res;
  }

  static async findKuisProgressById(idKuisProgress: string) {
    const res = await db
      .select()
      .from(tKuisProgress)
      .where(eq(tKuisProgress.idKuisProgress, idKuisProgress));
    return res;
  }

  static async findIdQuestionsByIdKuis(idKuis: string) {
    const ids = await db
      .select({ idKuisQuestion: tKuisQuestion.idKuisQuestion })
      .from(tKuisQuestion)
      .where(eq(tKuisQuestion.idKuis, idKuis));
    return ids;
  }

  static async findIdQuestionsKuisProgress(idKuisProgress: string) {
    const res = await db
      .select({ questionSet: tKuisProgress.questionSet })
      .from(tKuisProgress)
      .where(eq(tKuisProgress.idKuisProgress, idKuisProgress));
    const ids = res[0].questionSet;
    return ids ? (JSON.parse(ids) as string[]) : [];
  }

  static async findKuisJawabanUserByIdKuisProgress(idKuisProgress: string) {
    const res = await db
      .select()
      .from(tKuisJawabanUser)
      .where(eq(tKuisJawabanUser.idKuisProgress, idKuisProgress));
    return res;
  }

  static async findQuestionByIdKuis(idKuisQuestion: string) {
    const res = await db.query.tKuisQuestion.findFirst({
      where: {
        idKuisQuestion: idKuisQuestion,
      },
      with: {
        options: true,
      },
      columns: {
        answerOption: false,
      },
    });
    return res;
  }

  static async findNamaSubskillByIdKuis(idKuis: string) {
    const subskill = await db
      .select()
      .from(mSubSkill)
      .where(eq(mSubSkill.idKuis, idKuis));
    return subskill;
  }
}
