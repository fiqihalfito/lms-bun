import { db } from "database/connect";
import { mTeam } from "database/schema";
import { eq } from "drizzle-orm";

export async function getTeamById(idTeam: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idTeam, idTeam))
    return res
}