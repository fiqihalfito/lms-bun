import { timestamps } from "database/helper/columns.helpers";
import { pgTable } from "drizzle-orm/pg-core";

export const tKuis = pgTable('t_kuis', (t) => ({
    idKuis: t.uuid("id_kuis").defaultRandom().primaryKey(),
    ...timestamps,
}))

export const tKuisQuestion = pgTable('t_kuis_question', (t) => ({
    idKuisQuestion: t.uuid("id_kuis_question").defaultRandom().primaryKey(),
    idKuis: t.uuid("id_kuis").references(() => tKuis.idKuis),
    question: t.text("question").notNull(),
    answerOption: t.char("answer_option", { length: 1 }).notNull(),
}))

export const tKuisQuestionOption = pgTable('t_kuis_question_option', (t) => ({
    idKuisQuestionOption: t.uuid("id_kuis_question_option").defaultRandom().primaryKey(),
    idKuisQuestion: t.uuid("id_kuis_question").references(() => tKuisQuestion.idKuisQuestion),
    option: t.char("option", { length: 1 }).notNull(),
    optionDesc: t.text("option_desc").notNull(),
}))