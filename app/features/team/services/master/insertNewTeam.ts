import { db } from "database/connect.server";
import { mTeam } from "database/schema";

export async function insertNewTeam(idSubBidang: string, namaTeam: string) {
    await db.insert(mTeam).values({
        namaTeam,
        idSubBidang,
    });
}