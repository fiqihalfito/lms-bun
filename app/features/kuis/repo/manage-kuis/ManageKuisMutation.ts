import { db } from "database/connect.server";
import {
  tKuis,
  tKuisJawabanUser,
  tKuisProgress,
  tKuisQuestion,
  tKuisQuestionOption,
} from "database/schema";
import type { Tx } from "database/types";
import { and, eq, sql } from "drizzle-orm";

export abstract class ManageKuisMutation {
  static async insertKuis() {
    const newKuis = await db
      .insert(tKuis)
      .values({
        updated_at: sql`now()`,
      })
      .returning({ idKuis: tKuis.idKuis });
    return newKuis;
  }

  static async deleteKuisJawabanUserByIdKuisQuestion(
    idKuisQuestion: string,
    tx?: Tx,
  ) {
    if (tx) {
      await tx
        .delete(tKuisJawabanUser)
        .where(eq(tKuisJawabanUser.idKuisQuestion, idKuisQuestion));
    } else {
      await db
        .delete(tKuisJawabanUser)
        .where(eq(tKuisJawabanUser.idKuisQuestion, idKuisQuestion));
    }
  }

  static async deleteOptions(idKuisQuestion: string, tx?: Tx) {
    if (tx) {
      await tx
        .delete(tKuisQuestionOption)
        .where(eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion));
    } else {
      await db
        .delete(tKuisQuestionOption)
        .where(eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion));
    }
  }

  static async deleteQuestion(idKuisQuestion: string, tx?: Tx) {
    if (tx) {
      await tx
        .delete(tKuisQuestion)
        .where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion));
    } else {
      await db
        .delete(tKuisQuestion)
        .where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion));
    }
  }

  static async insertOptions(
    options: (typeof tKuisQuestionOption.$inferInsert)[],
  ) {
    await db.insert(tKuisQuestionOption).values(options);
  }

  static async insertQuestion(question: typeof tKuisQuestion.$inferInsert) {
    const newQuestion = await db
      .insert(tKuisQuestion)
      .values(question)
      .returning({ idKuisQuestion: tKuisQuestion.idKuisQuestion });
    return newQuestion;
  }

  static async updateKuisMetaData(
    idKuis: string,
    kuis: typeof tKuis.$inferInsert,
  ) {
    await db.update(tKuis).set(kuis).where(eq(tKuis.idKuis, idKuis));
  }

  static async updateKuisProgress(
    idKuisProgress: string,
    kuisProgress: Partial<typeof tKuisProgress.$inferInsert>,
    tx?: Tx,
  ) {
    if (tx) {
      await tx
        .update(tKuisProgress)
        .set(kuisProgress)
        .where(eq(tKuisProgress.idKuisProgress, idKuisProgress));
    } else {
      await db
        .update(tKuisProgress)
        .set(kuisProgress)
        .where(eq(tKuisProgress.idKuisProgress, idKuisProgress));
    }
  }

  static async updateOption(
    idKuisQuestion: string,
    optionData: { option: string; optionDesc: string },
  ) {
    await db
      .update(tKuisQuestionOption)
      .set(optionData)
      .where(
        and(
          eq(tKuisQuestionOption.option, optionData.option),
          eq(tKuisQuestionOption.idKuisQuestion, idKuisQuestion),
        ),
      );
  }

  static async updateQuestion(
    idKuisQuestion: string,
    question: Partial<typeof tKuisQuestion.$inferInsert>,
  ) {
    await db
      .update(tKuisQuestion)
      .set(question)
      .where(eq(tKuisQuestion.idKuisQuestion, idKuisQuestion));
  }
}
