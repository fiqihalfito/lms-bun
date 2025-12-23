import type { mUsers } from "database/schema";

export type IdUser = typeof mUsers.$inferSelect["idUser"]