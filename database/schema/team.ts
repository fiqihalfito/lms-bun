import { pgTable } from "drizzle-orm/pg-core";
import { mSubBidang } from "./subbidang";
import { mUsers } from "./users";

export const mTeam = pgTable('m_team', (t) => ({
    idTeam: t.uuid("id_team").defaultRandom().primaryKey(),
    namaTeam: t.text('nama_team'),
    idSubBidang: t.char('id_subbidang', { length: 2 }).references(() => mSubBidang.idSubBidang),
}))

// relasi many to many
export const mTeamMember = pgTable('m_team_member', (t) => ({
    idTeamMember: t.uuid("id_team_member").defaultRandom().primaryKey(),
    idTeam: t.uuid('id_team').references(() => mTeam.idTeam),
    idUser: t.uuid('id_user').references(() => mUsers.idUser),
}))