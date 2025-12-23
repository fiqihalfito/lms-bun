import { pgTable } from "drizzle-orm/pg-core";
import { mUsers } from "./users";
import { mSkill } from "./skill";

export const mSubSkill = pgTable('m_subskill', (t) => ({
    idSubSkill: t.uuid("id_subskill").defaultRandom().primaryKey(),
    namaSubSkill: t.text("nama_subskill").notNull(),
    level: t.integer("level").notNull().default(1),
    urutan: t.integer("urutan"),
    idUser: t.uuid("id_user").references(() => mUsers.idUser),
    idSkill: t.uuid("id_skill").references(() => mSkill.idSkill),
    // ...timestamps,
}))
