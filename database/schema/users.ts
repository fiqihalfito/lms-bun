import { timestamps } from "database/helper/columns.helpers";
import { pgTable } from "drizzle-orm/pg-core";
import { mRole } from "./role";
import { mSubBidang } from "./subbidang";

export const mUsers = pgTable("m_users", (t) => ({
    idUser: t.uuid("id_user").primaryKey().defaultRandom(),
    email: t.text("email").notNull().unique(),
    password: t.text("password").notNull(),
    idRole: t.varchar("id_role").references(() => mRole.idRole),
    ...timestamps,
}));

export const mUserProfiles = pgTable("m_user_profiles", (t) => ({
    idUser: t.uuid("id_user").references(() => mUsers.idUser, { onUpdate: "cascade" }).primaryKey(),
    namaUser: t.text("nama_user").notNull(),
    idSubBidang: t.char("id_subbidang", { length: 2 }).references(() => mSubBidang.idSubBidang),
    ...timestamps,
}));