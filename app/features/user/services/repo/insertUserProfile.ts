import { mUserProfiles } from "database/schema";
import { db } from "database/connect";

export async function insertUserProfile(userProfil: typeof mUserProfiles.$inferInsert) {
    await db.insert(mUserProfiles).values(userProfil)
}