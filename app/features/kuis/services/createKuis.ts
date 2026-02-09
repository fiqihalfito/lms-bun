import { db } from "database/connect.server";
import { tKuis } from "database/schema";
import { sql } from "drizzle-orm";

export async function createKuis() {
    const newKuis = await db.insert(tKuis).values({
        updated_at: sql`now()`,
    }).returning({ idKuis: tKuis.idKuis })
    return newKuis
}