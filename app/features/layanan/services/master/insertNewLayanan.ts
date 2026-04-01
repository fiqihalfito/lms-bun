import { db } from "database/connect.server";
import { mLayanan } from "database/schema";

export async function insertNewLayanan(idSubBidang: string, namaLayanan: string) {
    await db.insert(mLayanan).values({
        namaLayanan: namaLayanan,
        idSubBidang: idSubBidang,
    });
}