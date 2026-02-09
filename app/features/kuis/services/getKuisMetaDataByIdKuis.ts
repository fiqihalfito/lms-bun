import { db } from "database/connect.server";
import { tKuis } from "database/schema";
import { eq } from "drizzle-orm";

export async function getKuisMetaDataByIdKuis(idKuis: string) {
    const res = await db.select().from(tKuis).where(eq(tKuis.idKuis, idKuis))
    return res
}