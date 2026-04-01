import { db } from "database/connect.server";
import { mLayanan } from "database/schema";
import { eq } from "drizzle-orm";

export async function getLayananAllFilter(idSubBidang: string) {
    return db.select().from(mLayanan).where(eq(mLayanan.idSubBidang, idSubBidang))
        .orderBy(mLayanan.namaLayanan)
}