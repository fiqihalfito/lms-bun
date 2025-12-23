import { pgTable, unique } from "drizzle-orm/pg-core";
import { mUserProfiles, mUsers } from "./users";
import { timestamps } from "database/helper/columns.helpers";
import { mTeam } from "./team";
import { mLayanan } from "./layanan";
import { mSubBidang } from "./subbidang";

export const tDokumen = pgTable('t_dokumen', (t) => ({
    idDokumen: t.uuid("id_dokumen").defaultRandom().primaryKey(),
    judul: t.text('judul'),
    tipe: t.varchar('tipe'),
    filename: t.text('filename'),
    idLayanan: t.uuid('id_layanan').references(() => mLayanan.idLayanan),
    idSubBidang: t.char('id_subbidang', { length: 2 }).references(() => mSubBidang.idSubBidang),
    idUploader: t.uuid('id_uploader').references(() => mUserProfiles.idUser),
    idTeam: t.uuid('id_team').references(() => mTeam.idTeam),
    // idSubSkill: t.uuid('id_subskill').unique(),
    // idKuis: t.uuid('id_kuis'),
    ...timestamps,
}))

// many to many user <-> dokumen
export const tStatusBaca = pgTable('t_status_baca', (t) => ({
    idStatusBaca: t.uuid("id_status_baca").defaultRandom().primaryKey(),
    idPembaca: t.uuid('id_pembaca').references(() => mUserProfiles.idUser),
    idDokumen: t.uuid('id_dokumen').references(() => tDokumen.idDokumen),
    countRead: t.integer("count_read").default(0),
    ...timestamps
}), (table) => [
    unique().on(table.idPembaca, table.idDokumen)
])