import { db } from "database/connect";
import { mUsers } from "database/schema";
import { eq, getColumns } from "drizzle-orm";

export async function getUserByIdUser(idUser: string) {
    const { password, ...rest } = getColumns(mUsers);
    const res = await db.select({
        ...rest,
    }).from(mUsers).where(eq(mUsers.idUser, idUser))

    return res
}