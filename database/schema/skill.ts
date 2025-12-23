import { pgTable } from "drizzle-orm/pg-core";
import { mTeam } from "./team";
import { mSubBidang } from "./subbidang";

export const mSkill = pgTable('m_skill', (t) => ({
    idSkill: t.uuid("id_skill").defaultRandom().primaryKey(),
    namaSkill: t.text("nama_skill").notNull(),
    idTeam: t.uuid("id_team").references(() => mTeam.idTeam),
    idSubBidang: t.char("id_subbidang", { length: 2 }).references(() => mSubBidang.idSubBidang),
}))
