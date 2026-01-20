import { timestamps } from "database/helper/columns.helpers";
import { pgTable, unique } from "drizzle-orm/pg-core";
import { mUsers } from "./users";

export const tKuis = pgTable('t_kuis', (t) => ({
    idKuis: t.uuid("id_kuis").defaultRandom().primaryKey(),
    isLocked: t.boolean("is_locked").notNull().default(true),
    ...timestamps,
}))

export const tKuisQuestion = pgTable('t_kuis_question', (t) => ({
    idKuisQuestion: t.uuid("id_kuis_question").defaultRandom().primaryKey(),
    idKuis: t.uuid("id_kuis").references(() => tKuis.idKuis),
    question: t.text("question").notNull(),
    answerOption: t.char("answer_option", { length: 1 }).notNull(),
    waktuPengerjaanDetik: t.integer("waktu_pengerjaan_detik").default(15),
    ...timestamps,
}))

export const tKuisQuestionOption = pgTable('t_kuis_question_option', (t) => ({
    idKuisQuestionOption: t.uuid("id_kuis_question_option").defaultRandom().primaryKey(),
    idKuisQuestion: t.uuid("id_kuis_question").references(() => tKuisQuestion.idKuisQuestion),
    option: t.char("option", { length: 1 }).notNull(),
    optionDesc: t.text("option_desc").notNull(),
}))

export const tKuisProgress = pgTable('t_kuis_progress', (t) => ({
    idKuisProgress: t.uuid("id_kuis_progress").defaultRandom().primaryKey(),
    idKuis: t.uuid("id_kuis").references(() => tKuis.idKuis),
    idUser: t.uuid("id_user").references(() => mUsers.idUser),
    totalScore: t.integer("total_score").default(0),
    jumlahBenar: t.integer("jumlah_benar").default(0),
    jumlahSoal: t.integer("jumlah_soal").default(0),
    startedAt: t.timestamp("started_at", { mode: 'string' }).defaultNow(),
    completedAt: t.timestamp("completed_at", { mode: 'string' }),
    totalWaktuPengerjaanDetik: t.integer("total_waktu_pengerjaan_detik").default(0),
    questionSet: t.text("question_set").default('[]'),
}), (t) => [
    unique().on(t.idKuis, t.idUser) // 1 progress 1 kuis 1 subskill
])

export const tKuisJawabanUser = pgTable('t_kuis_jawaban_user', (t) => ({
    idKuisJawabanUser: t.uuid("id_kuis_jawaban_user").defaultRandom().primaryKey(),
    idKuisProgress: t.uuid("id_kuis_progress").references(() => tKuisProgress.idKuisProgress),
    idKuisQuestion: t.uuid("id_kuis_question").references(() => tKuisQuestion.idKuisQuestion),
    answer: t.char("answer", { length: 1 }),
    isCorrect: t.boolean("is_correct").default(false),
    score: t.integer("score").default(0),
    waktuPengerjaanDetik: t.integer("waktu_pengerjaan_detik").default(0),
}))