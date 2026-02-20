import { db } from "database/connect.server";
import { mSubBidang } from "database/schema";

export async function getAllSubbidang() {
    const res = await db.select().from(mSubBidang).orderBy(mSubBidang.idSubBidang)
    return res
}