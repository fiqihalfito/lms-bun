import { pgTable, uuid, varchar, char, text, timestamp, integer, boolean, foreignKey, primaryKey, unique } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const mLayanan = pgTable("m_layanan", {
	idLayanan: uuid("id_layanan").defaultRandom().primaryKey(),
	namaLayanan: text("nama_layanan"),
	idSubbidang: char("id_subbidang", { length: 2 }).references(() => mSubbidang.idSubbidang),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
});

export const mRole = pgTable("m_role", {
	idRole: varchar("id_role").primaryKey(),
	namaRole: text("nama_role"),
});

export const mSkill = pgTable("m_skill", {
	idSkill: uuid("id_skill").defaultRandom().primaryKey(),
	namaSkill: text("nama_skill").notNull(),
	idTeam: uuid("id_team").references(() => mTeam.idTeam),
	idSubbidang: char("id_subbidang", { length: 2 }).references(() => mSubbidang.idSubbidang),
});

export const mSubbidang = pgTable("m_subbidang", {
	idSubbidang: char("id_subbidang", { length: 2 }).primaryKey(),
	namaSubbidang: text("nama_subbidang"),
});

export const mSubskill = pgTable("m_subskill", {
	idSubskill: uuid("id_subskill").defaultRandom().primaryKey(),
	namaSubskill: text("nama_subskill").notNull(),
	level: integer().default(1).notNull(),
	urutan: integer(),
	idPic: uuid("id_pic").references(() => mUsers.idUser),
	idSkill: uuid("id_skill").references(() => mSkill.idSkill),
	idDokumen: uuid("id_dokumen").references(() => tDokumen.idDokumen),
	idKuis: uuid("id_kuis").references(() => tKuis.idKuis),
});

export const mTeam = pgTable("m_team", {
	idTeam: uuid("id_team").defaultRandom().primaryKey(),
	namaTeam: text("nama_team"),
	idSubbidang: char("id_subbidang", { length: 2 }).references(() => mSubbidang.idSubbidang),
});

export const mTeamMember = pgTable("m_team_member", {
	idTeamMember: uuid("id_team_member").defaultRandom().primaryKey(),
	idTeam: uuid("id_team").references(() => mTeam.idTeam),
	idUser: uuid("id_user").references(() => mUsers.idUser),
});

export const mUserProfiles = pgTable("m_user_profiles", {
	idUser: uuid("id_user").primaryKey().references(() => mUsers.idUser, { onUpdate: "cascade" } ),
	namaUser: text("nama_user").notNull(),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
	idSubbidang: char("id_subbidang", { length: 2 }).references(() => mSubbidang.idSubbidang),
});

export const mUsers = pgTable("m_users", {
	idUser: uuid("id_user").defaultRandom().primaryKey(),
	email: text().notNull(),
	password: text().notNull(),
	idRole: varchar("id_role").references(() => mRole.idRole),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
}, (table) => [
	unique("m_users_email_unique").on(table.email),]);

export const tDokumen = pgTable("t_dokumen", {
	idDokumen: uuid("id_dokumen").defaultRandom().primaryKey(),
	judul: text(),
	tipe: varchar(),
	filename: text(),
	idLayanan: uuid("id_layanan").references(() => mLayanan.idLayanan),
	idSubbidang: char("id_subbidang", { length: 2 }).references(() => mSubbidang.idSubbidang),
	idUploader: uuid("id_uploader").references(() => mUserProfiles.idUser),
	idTeam: uuid("id_team").references(() => mTeam.idTeam),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
});

export const tKuis = pgTable("t_kuis", {
	idKuis: uuid("id_kuis").defaultRandom().primaryKey(),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
	isLocked: boolean("is_locked").default(true).notNull(),
});

export const tKuisJawabanUser = pgTable("t_kuis_jawaban_user", {
	idKuisJawabanUser: uuid("id_kuis_jawaban_user").defaultRandom().primaryKey(),
	idKuisProgress: uuid("id_kuis_progress").references(() => tKuisProgress.idKuisProgress),
	idKuisQuestion: uuid("id_kuis_question").references(() => tKuisQuestion.idKuisQuestion),
	answer: char({ length: 1 }),
	isCorrect: boolean("is_correct").default(false),
	score: integer().default(0),
	waktuPengerjaanDetik: integer("waktu_pengerjaan_detik").default(0),
});

export const tKuisProgress = pgTable("t_kuis_progress", {
	idKuisProgress: uuid("id_kuis_progress").defaultRandom().primaryKey(),
	idKuis: uuid("id_kuis").references(() => tKuis.idKuis),
	idUser: uuid("id_user").references(() => mUsers.idUser),
	totalScore: integer("total_score").default(0),
	jumlahBenar: integer("jumlah_benar").default(0),
	jumlahSoal: integer("jumlah_soal").default(0),
	completedAt: timestamp("completed_at"),
	totalWaktuPengerjaanDetik: integer("total_waktu_pengerjaan_detik").default(0),
	startedAt: timestamp("started_at").default(sql`now()`),
	questionSet: text("question_set").default("[]"),
}, (table) => [
	unique("t_kuis_progress_id_kuis_id_user_unique").on(table.idKuis, table.idUser),]);

export const tKuisQuestion = pgTable("t_kuis_question", {
	idKuisQuestion: uuid("id_kuis_question").defaultRandom().primaryKey(),
	idKuis: uuid("id_kuis").references(() => tKuis.idKuis),
	question: text().notNull(),
	answerOption: char("answer_option", { length: 1 }).notNull(),
	waktuPengerjaanDetik: integer("waktu_pengerjaan_detik").default(15),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
});

export const tKuisQuestionOption = pgTable("t_kuis_question_option", {
	idKuisQuestionOption: uuid("id_kuis_question_option").defaultRandom().primaryKey(),
	idKuisQuestion: uuid("id_kuis_question").references(() => tKuisQuestion.idKuisQuestion),
	option: char({ length: 1 }).notNull(),
	optionDesc: text("option_desc").notNull(),
});

export const tStatusBaca = pgTable("t_status_baca", {
	idStatusBaca: uuid("id_status_baca").defaultRandom().primaryKey(),
	idPembaca: uuid("id_pembaca").references(() => mUserProfiles.idUser),
	idDokumen: uuid("id_dokumen").references(() => tDokumen.idDokumen),
	countRead: integer("count_read").default(0),
	updatedAt: timestamp("updated_at"),
	createdAt: timestamp("created_at").default(sql`now()`).notNull(),
	deletedAt: timestamp("deleted_at"),
}, (table) => [
	unique("t_status_baca_id_pembaca_id_dokumen_unique").on(table.idPembaca, table.idDokumen),]);
