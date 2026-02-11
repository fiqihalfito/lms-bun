import { db } from "database/connect.server";
import { mSubBidang } from "database/schema";
import { eq } from "drizzle-orm";



export async function getSubBidangNameByIdSubBidang(idSubBidang: string | null) {
    if (!idSubBidang) return null;
    const res = await db.select({ namaSubBidang: mSubBidang.namaSubBidang }).from(mSubBidang).where(eq(mSubBidang.idSubBidang, idSubBidang));
    return res[0].namaSubBidang;
}