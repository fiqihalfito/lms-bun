import { db } from "database/connect.server";
import { mUserProfiles } from "database/schema";
import { eq } from "drizzle-orm";

export async function updateUserProfile(idUser: string, userProfil: typeof mUserProfiles.$inferInsert) {
    await db.update(mUserProfiles).set({
        namaUser: userProfil.namaUser,
        // idUser: userProfil.idUser,
    }).where(eq(mUserProfiles.idUser, idUser))
}