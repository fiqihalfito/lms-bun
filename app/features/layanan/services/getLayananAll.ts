import { db } from "database/connect";
import { mLayanan } from "database/schema";
import { eq, getColumns } from "drizzle-orm";

export async function getLayananAll(idSubBidang: string) {
       const { idLayanan, namaLayanan } = getColumns(mLayanan);
       const res = await db.select({ idLayanan, namaLayanan }).from(mLayanan).where(eq(mLayanan.idSubBidang, idSubBidang))
       return res
}