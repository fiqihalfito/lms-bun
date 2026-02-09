import { db } from "database/connect.server";
import { tKuisProgress } from "database/schema";
import { eq, sql } from "drizzle-orm";

export async function resetKuisProgress(idKuisProgress: string) {
    await db.update(tKuisProgress).set({
        totalScore: 0,
        jumlahBenar: 0,
        jumlahSoal: 0,
        completedAt: null,
        totalWaktuPengerjaanDetik: 0,
        startedAt: sql`now()`,
        questionSet: '[]'
    }).where(eq(tKuisProgress.idKuisProgress, idKuisProgress))
}