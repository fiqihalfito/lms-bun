
CREATE TABLE "m_user_profiles" (
	"id_user" uuid PRIMARY KEY,
	"nama_user" text NOT NULL,
	"id_subbidang" char(2),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "m_users" (
	"id_user" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" text NOT NULL UNIQUE,
	"password" text NOT NULL,
	"id_role" varchar,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "t_dokumen" (
	"id_dokumen" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"judul" text,
	"tipe" varchar,
	"filename" text,
	"id_layanan" uuid,
	"id_subbidang" char(2),
	"id_uploader" uuid,
	"id_team" uuid,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "t_status_baca" (
	"id_status_baca" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_pembaca" uuid,
	"id_dokumen" uuid,
	"count_read" integer DEFAULT 0,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "t_status_baca_id_pembaca_id_dokumen_unique" UNIQUE("id_pembaca","id_dokumen")
);
--> statement-breakpoint
CREATE TABLE "m_subbidang" (
	"id_subbidang" char(2) PRIMARY KEY,
	"nama_subbidang" text
);
--> statement-breakpoint
CREATE TABLE "m_layanan" (
	"id_layanan" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"nama_layanan" text,
	"id_subbidang" char(2),
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "m_team" (
	"id_team" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"nama_team" text,
	"id_subbidang" char(2)
);
--> statement-breakpoint
CREATE TABLE "m_team_member" (
	"id_team_member" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_team" uuid,
	"id_user" uuid
);
--> statement-breakpoint
CREATE TABLE "m_skill" (
	"id_skill" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"nama_skill" text NOT NULL,
	"id_team" uuid,
	"id_subbidang" char(2)
);
--> statement-breakpoint
CREATE TABLE "m_subskill" (
	"id_subskill" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"nama_subskill" text NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"urutan" integer,
	"id_pic" uuid,
	"id_skill" uuid,
	"id_dokumen" uuid,
	"id_kuis" uuid
);
--> statement-breakpoint
CREATE TABLE "m_role" (
	"id_role" varchar PRIMARY KEY,
	"nama_role" text
);
--> statement-breakpoint
CREATE TABLE "t_kuis" (
	"id_kuis" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"is_locked" boolean DEFAULT true NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "t_kuis_jawaban_user" (
	"id_kuis_jawaban_user" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_kuis_progress" uuid,
	"id_kuis_question" uuid,
	"answer" char(1),
	"is_correct" boolean DEFAULT false,
	"score" integer DEFAULT 0,
	"waktu_pengerjaan_detik" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "t_kuis_progress" (
	"id_kuis_progress" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_kuis" uuid,
	"id_user" uuid,
	"score" integer DEFAULT 0,
	"jumlah_benar" integer DEFAULT 0,
	"jumlah_soal" integer DEFAULT 0,
	"started_at" timestamp DEFAULT now(),
	"completed_at" timestamp,
	"total_waktu_pengerjaan_detik" integer DEFAULT 0,
	"question_set" text DEFAULT '[]',
	CONSTRAINT "t_kuis_progress_id_kuis_id_user_unique" UNIQUE("id_kuis","id_user")
);
--> statement-breakpoint
CREATE TABLE "t_kuis_question" (
	"id_kuis_question" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_kuis" uuid,
	"question" text NOT NULL,
	"answer_option" char(1) NOT NULL,
	"waktu_pengerjaan_detik" integer DEFAULT 15
);
--> statement-breakpoint
CREATE TABLE "t_kuis_question_option" (
	"id_kuis_question_option" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"id_kuis_question" uuid,
	"option" char(1) NOT NULL,
	"option_desc" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "m_user_profiles" ADD CONSTRAINT "m_user_profiles_id_user_m_users_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "m_users"("id_user") ON UPDATE CASCADE;--> statement-breakpoint
ALTER TABLE "m_user_profiles" ADD CONSTRAINT "m_user_profiles_id_subbidang_m_subbidang_id_subbidang_fkey" FOREIGN KEY ("id_subbidang") REFERENCES "m_subbidang"("id_subbidang");--> statement-breakpoint
ALTER TABLE "m_users" ADD CONSTRAINT "m_users_id_role_m_role_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "m_role"("id_role");--> statement-breakpoint
ALTER TABLE "t_dokumen" ADD CONSTRAINT "t_dokumen_id_layanan_m_layanan_id_layanan_fkey" FOREIGN KEY ("id_layanan") REFERENCES "m_layanan"("id_layanan");--> statement-breakpoint
ALTER TABLE "t_dokumen" ADD CONSTRAINT "t_dokumen_id_subbidang_m_subbidang_id_subbidang_fkey" FOREIGN KEY ("id_subbidang") REFERENCES "m_subbidang"("id_subbidang");--> statement-breakpoint
ALTER TABLE "t_dokumen" ADD CONSTRAINT "t_dokumen_id_uploader_m_user_profiles_id_user_fkey" FOREIGN KEY ("id_uploader") REFERENCES "m_user_profiles"("id_user");--> statement-breakpoint
ALTER TABLE "t_dokumen" ADD CONSTRAINT "t_dokumen_id_team_m_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "m_team"("id_team");--> statement-breakpoint
ALTER TABLE "t_status_baca" ADD CONSTRAINT "t_status_baca_id_pembaca_m_user_profiles_id_user_fkey" FOREIGN KEY ("id_pembaca") REFERENCES "m_user_profiles"("id_user");--> statement-breakpoint
ALTER TABLE "t_status_baca" ADD CONSTRAINT "t_status_baca_id_dokumen_t_dokumen_id_dokumen_fkey" FOREIGN KEY ("id_dokumen") REFERENCES "t_dokumen"("id_dokumen");--> statement-breakpoint
ALTER TABLE "m_layanan" ADD CONSTRAINT "m_layanan_id_subbidang_m_subbidang_id_subbidang_fkey" FOREIGN KEY ("id_subbidang") REFERENCES "m_subbidang"("id_subbidang");--> statement-breakpoint
ALTER TABLE "m_team" ADD CONSTRAINT "m_team_id_subbidang_m_subbidang_id_subbidang_fkey" FOREIGN KEY ("id_subbidang") REFERENCES "m_subbidang"("id_subbidang");--> statement-breakpoint
ALTER TABLE "m_team_member" ADD CONSTRAINT "m_team_member_id_team_m_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "m_team"("id_team");--> statement-breakpoint
ALTER TABLE "m_team_member" ADD CONSTRAINT "m_team_member_id_user_m_users_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "m_users"("id_user");--> statement-breakpoint
ALTER TABLE "m_skill" ADD CONSTRAINT "m_skill_id_team_m_team_id_team_fkey" FOREIGN KEY ("id_team") REFERENCES "m_team"("id_team");--> statement-breakpoint
ALTER TABLE "m_skill" ADD CONSTRAINT "m_skill_id_subbidang_m_subbidang_id_subbidang_fkey" FOREIGN KEY ("id_subbidang") REFERENCES "m_subbidang"("id_subbidang");--> statement-breakpoint
ALTER TABLE "m_subskill" ADD CONSTRAINT "m_subskill_id_pic_m_users_id_user_fkey" FOREIGN KEY ("id_pic") REFERENCES "m_users"("id_user");--> statement-breakpoint
ALTER TABLE "m_subskill" ADD CONSTRAINT "m_subskill_id_skill_m_skill_id_skill_fkey" FOREIGN KEY ("id_skill") REFERENCES "m_skill"("id_skill");--> statement-breakpoint
ALTER TABLE "m_subskill" ADD CONSTRAINT "m_subskill_id_dokumen_t_dokumen_id_dokumen_fkey" FOREIGN KEY ("id_dokumen") REFERENCES "t_dokumen"("id_dokumen");--> statement-breakpoint
ALTER TABLE "m_subskill" ADD CONSTRAINT "m_subskill_id_kuis_t_kuis_id_kuis_fkey" FOREIGN KEY ("id_kuis") REFERENCES "t_kuis"("id_kuis");--> statement-breakpoint
ALTER TABLE "t_kuis_jawaban_user" ADD CONSTRAINT "t_kuis_jawaban_user_5sT9KseoJHue_fkey" FOREIGN KEY ("id_kuis_progress") REFERENCES "t_kuis_progress"("id_kuis_progress");--> statement-breakpoint
ALTER TABLE "t_kuis_jawaban_user" ADD CONSTRAINT "t_kuis_jawaban_user_GQmipoOs3edB_fkey" FOREIGN KEY ("id_kuis_question") REFERENCES "t_kuis_question"("id_kuis_question");--> statement-breakpoint
ALTER TABLE "t_kuis_progress" ADD CONSTRAINT "t_kuis_progress_id_kuis_t_kuis_id_kuis_fkey" FOREIGN KEY ("id_kuis") REFERENCES "t_kuis"("id_kuis");--> statement-breakpoint
ALTER TABLE "t_kuis_progress" ADD CONSTRAINT "t_kuis_progress_id_user_m_users_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "m_users"("id_user");--> statement-breakpoint
ALTER TABLE "t_kuis_question" ADD CONSTRAINT "t_kuis_question_id_kuis_t_kuis_id_kuis_fkey" FOREIGN KEY ("id_kuis") REFERENCES "t_kuis"("id_kuis");--> statement-breakpoint
ALTER TABLE "t_kuis_question_option" ADD CONSTRAINT "t_kuis_question_option_cnxzC0VSPkwd_fkey" FOREIGN KEY ("id_kuis_question") REFERENCES "t_kuis_question"("id_kuis_question");