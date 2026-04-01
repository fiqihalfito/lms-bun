import { db } from "database/connect.server";
import { mTeam } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateTeam(idTeam: string, namaTeam: string) {
    await db.update(mTeam).set({
        namaTeam,
    }).where(eq(mTeam.idTeam, idTeam));
}