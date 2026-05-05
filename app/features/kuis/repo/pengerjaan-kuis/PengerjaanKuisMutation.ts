import { db } from "database/connect.server";
import { tKuisJawabanUser, tKuisProgress } from "database/schema";
import { and, eq, sql } from "drizzle-orm";

export abstract class PengerjaanKuisMutation {
  static async insertKuisProgress(data: typeof tKuisProgress.$inferInsert) {
    const newKuisProgress = await db
      .insert(tKuisProgress)
      .values(data)
      .returning({ idKuisProgress: tKuisProgress.idKuisProgress });
    return newKuisProgress[0].idKuisProgress;
  }

  static async deleteKuisJawabanUser(idKuisProgress: string) {
    await db
      .delete(tKuisJawabanUser)
      .where(eq(tKuisJawabanUser.idKuisProgress, idKuisProgress));
  }

  static async updateKuisProgress(
    idKuisProgress: string,
    data: Partial<typeof tKuisProgress.$inferInsert>,
  ) {
    await db
      .update(tKuisProgress)
      .set(data)
      .where(eq(tKuisProgress.idKuisProgress, idKuisProgress));
  }

  static async insertQuestionsInKuisJawabanUser(
    idKuisProgress: string,
    idQuestions: string[],
  ) {
    await db.insert(tKuisJawabanUser).values(
      idQuestions.map(
        (idQuestion) =>
          ({
            idKuisQuestion: idQuestion,
            idKuisProgress: idKuisProgress,
            // answer: null, akan diupdate saat submit current soal
            isCorrect: false,
            score: 0,
            waktuPengerjaanDetik: 0,
          }) satisfies typeof tKuisJawabanUser.$inferInsert,
      ),
    );
  }

  static async updateKuisJawabanUser(
    idKuisProgress: string,
    idKuisQuestion: string,
    kuisJawabanUser: typeof tKuisJawabanUser.$inferInsert,
  ) {
    await db
      .update(tKuisJawabanUser)
      .set(kuisJawabanUser)
      .where(
        and(
          eq(tKuisJawabanUser.idKuisProgress, idKuisProgress),
          eq(tKuisJawabanUser.idKuisQuestion, idKuisQuestion),
        ),
      );
  }
}
