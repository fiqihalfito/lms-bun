import { db } from "database/connect.server";
import { tStatusBaca } from "database/schema";
import { sql } from "drizzle-orm";

export async function markAsRead(idDokumen: string, idPembaca: string) {
    await db.insert(tStatusBaca).values({
        idDokumen: idDokumen,
        idPembaca: idPembaca,
        updated_at: sql`now()`,
        countRead: 1,
    }).onConflictDoUpdate({
        target: [tStatusBaca.idDokumen, tStatusBaca.idPembaca],
        set: {
            countRead: sql`${tStatusBaca.countRead} + 1`,
            updated_at: sql`now()`,
        }
    })
}