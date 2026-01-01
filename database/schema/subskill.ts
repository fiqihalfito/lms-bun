import { pgTable } from "drizzle-orm/pg-core";
import { mUsers } from "./users";
import { mSkill } from "./skill";
import { tDokumen } from "./dokumen";
import { tKuis } from "./kuis";

export const mSubSkill = pgTable('m_subskill', (t) => ({
    idSubSkill: t.uuid("id_subskill").defaultRandom().primaryKey(),
    namaSubSkill: t.text("nama_subskill").notNull(),
    level: t.integer("level").notNull().default(1),
    urutan: t.integer("urutan"),
    idPic: t.uuid("id_pic").references(() => mUsers.idUser),
    idSkill: t.uuid("id_skill").references(() => mSkill.idSkill),
    idDokumen: t.uuid("id_dokumen").references(() => tDokumen.idDokumen),
    idKuis: t.uuid("id_kuis").references(() => tKuis.idKuis),
    // ...timestamps,
}))
