import { db } from "database/connect.server";
import {
  tKuis,
  tKuisProgress,
  tKuisQuestion,
  tKuisQuestionOption,
} from "database/schema";
import { eq, sql } from "drizzle-orm";

export abstract class ManageKuisQuery {
  static async findAllQuestionsByIdKuis(idKuis: string) {
    const res = await db.query.tKuisQuestion.findMany({
      where: {
        idKuis: idKuis,
      },
      orderBy: (t) => sql`${t.updated_at} desc nulls last`,
      with: {
        correctOption: true,
      },
    });
    return res;
  }

  static async findJumlahQuestionsByIdKuis(idKuis: string) {
    const jumlahQuestions = await db
      .select()
      .from(tKuisQuestion)
      .where(eq(tKuisQuestion.idKuis, idKuis));
    return jumlahQuestions.length;
  }

  static async findKuisMetaDataByIdKuis(idKuis: string) {
    const res = await db.select().from(tKuis).where(eq(tKuis.idKuis, idKuis));
    return res;
  }

  static async findKuisProgressById(idKuisProgress: string) {
    const res = await db
      .select()
      .from(tKuisProgress)
      .where(eq(tKuisProgress.idKuisProgress, idKuisProgress));
    return res;
  }

  static async findOptionsByIdKuisQuestion(idKuisQuestion: string) {
    const options = await db
      .select()
      .from(tKuisQuestionOption)
      .where(eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion));
    return options;
  }

  static async findQuestionByIdKuisQuestion(idKuisQuestion: string) {
    const question = await db
      .select()
      .from(tKuisQuestion)
      .where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion));
    return question;
  }
}
