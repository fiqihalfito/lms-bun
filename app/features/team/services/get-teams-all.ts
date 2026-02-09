import { db } from "database/connect.server"
import { mTeam } from "database/schema"
import { eq } from "drizzle-orm"

export async function getTeamsAll(idSubBidang: string) {
    const res = await db.select().from(mTeam).where(eq(mTeam.idSubBidang, idSubBidang))
    return res
}