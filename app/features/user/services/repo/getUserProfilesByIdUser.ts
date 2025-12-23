import { db } from "database/connect";
import { mUserProfiles } from "database/schema";
import { eq, getColumns } from "drizzle-orm";

export async function getUserProfilesByIdUser(idUser: string) {
    return await db.select().from(mUserProfiles).where(eq(mUserProfiles.idUser, idUser));
}