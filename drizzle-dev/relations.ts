import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	mLayanan: {
		mSubbidang: r.one.mSubbidang({
			from: r.mLayanan.idSubbidang,
			to: r.mSubbidang.idSubbidang
		}),
		tDokumen: r.many.tDokumen(),
	},
	mSubbidang: {
		mLayanans: r.many.mLayanan(),
		mTeamsViaMSkill: r.many.mTeam({
			from: r.mSubbidang.idSubbidang.through(r.mSkill.idSubbidang),
			to: r.mTeam.idTeam.through(r.mSkill.idTeam),
			alias: "mSubbidang_idSubbidang_mTeam_idTeam_via_mSkill"
		}),
		mTeamsIdSubbidang: r.many.mTeam({
			alias: "mTeam_idSubbidang_mSubbidang_idSubbidang"
		}),
		mUsers: r.many.mUsers({
			from: r.mSubbidang.idSubbidang.through(r.mUserProfiles.idSubbidang),
			to: r.mUsers.idUser.through(r.mUserProfiles.idUser)
		}),
		tDokumen: r.many.tDokumen(),
	},
	mTeam: {
		mSubbidangs: r.many.mSubbidang({
			alias: "mSubbidang_idTeam_mTeam_id_team_via_mSkill"
		}),
		mSubbidang: r.one.mSubbidang({
			from: r.mTeam.idSubbidang,
			to: r.mSubbidang.idSubbidang,
			alias: "mTeam_idSubbidang_mSubbidang_idSubbidang"
		}),
		mUsers: r.many.mUsers({
			from: r.mTeam.idTeam.through(r.mTeamMember.idTeam),
			to: r.mUsers.idUser.through(r.mTeamMember.idUser)
		}),
		tDokumen: r.many.tDokumen(),
	},
	mSubskill: {
		tDokuman: r.one.tDokumen({
			from: r.mSubskill.idDokumen,
			to: r.tDokumen.idDokumen
		}),
		tKui: r.one.tKuis({
			from: r.mSubskill.idKuis,
			to: r.tKuis.idKuis
		}),
		mSkill: r.one.mSkill({
			from: r.mSubskill.idSkill,
			to: r.mSkill.idSkill
		}),
		mUser: r.one.mUsers({
			from: r.mSubskill.idPic,
			to: r.mUsers.idUser
		}),
	},
	tDokumen: {
		mSubskills: r.many.mSubskill(),
		mLayanan: r.one.mLayanan({
			from: r.tDokumen.idLayanan,
			to: r.mLayanan.idLayanan
		}),
		mSubbidang: r.one.mSubbidang({
			from: r.tDokumen.idSubbidang,
			to: r.mSubbidang.idSubbidang
		}),
		mTeam: r.one.mTeam({
			from: r.tDokumen.idTeam,
			to: r.mTeam.idTeam
		}),
		mUserProfile: r.one.mUserProfiles({
			from: r.tDokumen.idUploader,
			to: r.mUserProfiles.idUser,
			alias: "tDokumen_idUploader_mUserProfiles_idUser"
		}),
		mUserProfiles: r.many.mUserProfiles({
			from: r.tDokumen.idDokumen.through(r.tStatusBaca.idDokumen),
			to: r.mUserProfiles.idUser.through(r.tStatusBaca.idPembaca),
			alias: "tDokumen_idDokumen_mUserProfiles_idUser_via_tStatusBaca"
		}),
	},
	tKuis: {
		mSubskills: r.many.mSubskill(),
		mUsers: r.many.mUsers({
			from: r.tKuis.idKuis.through(r.tKuisProgress.idKuis),
			to: r.mUsers.idUser.through(r.tKuisProgress.idUser)
		}),
		tKuisQuestions: r.many.tKuisQuestion(),
	},
	mSkill: {
		mSubskills: r.many.mSubskill(),
	},
	mUsers: {
		mSubskills: r.many.mSubskill(),
		mTeams: r.many.mTeam(),
		mSubbidangs: r.many.mSubbidang(),
		mRole: r.one.mRole({
			from: r.mUsers.idRole,
			to: r.mRole.idRole
		}),
		tKuis: r.many.tKuis(),
	},
	mRole: {
		mUsers: r.many.mUsers(),
	},
	mUserProfiles: {
		tDokumenIdUploader: r.many.tDokumen({
			alias: "tDokumen_idUploader_mUserProfiles_idUser"
		}),
		tDokumenViaTStatusBaca: r.many.tDokumen({
			alias: "tDokumen_idUser_mUserProfiles_id_user_via_tStatusBaca"
		}),
	},
	tKuisProgress: {
		tKuisQuestions: r.many.tKuisQuestion({
			from: r.tKuisProgress.idKuisProgress.through(r.tKuisJawabanUser.idKuisProgress),
			to: r.tKuisQuestion.idKuisQuestion.through(r.tKuisJawabanUser.idKuisQuestion)
		}),
	},
	tKuisQuestion: {
		tKuisProgresses: r.many.tKuisProgress(),
		tKui: r.one.tKuis({
			from: r.tKuisQuestion.idKuis,
			to: r.tKuis.idKuis
		}),
		tKuisQuestionOptions: r.many.tKuisQuestionOption(),
	},
	tKuisQuestionOption: {
		tKuisQuestion: r.one.tKuisQuestion({
			from: r.tKuisQuestionOption.idKuisQuestion,
			to: r.tKuisQuestion.idKuisQuestion
		}),
	},
}))