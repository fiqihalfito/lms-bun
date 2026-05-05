import { db } from "database/connect.server";
import { tDokumen, tStatusBaca } from "database/schema";
import { eq, sql } from "drizzle-orm";

export abstract class DokumenMutation {
  static async insertDokumen(
    dokumen: typeof tDokumen.$inferInsert,
    withReturning: boolean,
  ) {

    const query = db.insert(tDokumen).values(dokumen).$dynamic()
    if (withReturning) {
      const newId = await query.returning({ idDokumen: tDokumen.idDokumen })
      return newId[0].idDokumen
    }
    await query
  }

  static async updateDokumen(idDokumen: string, dokumen: typeof tDokumen.$inferInsert) {
    await db.update(tDokumen).set(dokumen).where(eq(tDokumen.idDokumen, idDokumen))
  }

  static async insertStatusBacaOnConflictDoUpdate(
    idDokumen: string,
    idPembaca: string,
  ) {
    await db
      .insert(tStatusBaca)
      .values({
        idDokumen: idDokumen,
        idPembaca: idPembaca,
        updated_at: sql`now()`,
        countRead: 1,
      })
      .onConflictDoUpdate({
        target: [tStatusBaca.idDokumen, tStatusBaca.idPembaca],
        set: {
          countRead: sql`${tStatusBaca.countRead} + 1`,
          updated_at: sql`now()`,
        },
      });
  }
}
