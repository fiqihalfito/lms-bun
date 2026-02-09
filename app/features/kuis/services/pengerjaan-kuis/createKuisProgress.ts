import { db } from "database/connect.server";
import { tKuisProgress } from "database/schema";
import { sql } from "drizzle-orm";

export async function createKuisProgress(idKuis: string, idUser: string) {
    const newKuisProgress = await db.insert(tKuisProgress).values({
        idKuis: idKuis,
        idUser: idUser,
        completedAt: null,
        jumlahBenar: 0,
        jumlahSoal: 0,
        totalScore: 0,
        totalWaktuPengerjaanDetik: 0,
        startedAt: sql`now()`,
    }).returning({ idKuisProgress: tKuisProgress.idKuisProgress })
    return newKuisProgress[0].idKuisProgress
}