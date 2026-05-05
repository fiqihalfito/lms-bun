import { db } from "database/connect.server";
import { mLayanan } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class LayananMutation {
  static async insertLayanan(idSubBidang: string, namaLayanan: string) {
    await db.insert(mLayanan).values({
      namaLayanan: namaLayanan,
      idSubBidang: idSubBidang,
    });
  }

  static async updateLayanan(idLayanan: string, namaLayanan: string) {
    await db
      .update(mLayanan)
      .set({
        namaLayanan: namaLayanan,
      })
      .where(eq(mLayanan.idLayanan, idLayanan));
  }
}
