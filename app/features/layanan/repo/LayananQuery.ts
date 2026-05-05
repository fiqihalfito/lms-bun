import { db } from "database/connect.server";
import { mLayanan } from "database/schema";
import { eq, getColumns } from "drizzle-orm";

export abstract class LayananQuery {
  static async findAllLayanan(idSubBidang: string) {
    const { idLayanan, namaLayanan } = getColumns(mLayanan);
    const res = await db
      .select({ idLayanan, namaLayanan })
      .from(mLayanan)
      .where(eq(mLayanan.idSubBidang, idSubBidang))
      .orderBy(mLayanan.namaLayanan);
    return res;
  }

  static async findById(idLayanan: string) {
    const res = await db
      .select()
      .from(mLayanan)
      .where(eq(mLayanan.idLayanan, idLayanan));
    return res;
  }
}
