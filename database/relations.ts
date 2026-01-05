import * as schema from "./schema/index"
import { defineRelations } from "drizzle-orm"

export const relations = defineRelations(schema, (r) => ({
    tDokumen: {
        uploader: r.one.mUserProfiles({
            from: r.tDokumen.idUploader,
            to: r.mUserProfiles.idUser
        }),
        layanan: r.one.mLayanan({
            from: r.tDokumen.idLayanan,
            to: r.mLayanan.idLayanan
        }),
        team: r.one.mTeam({
            from: r.tDokumen.idTeam,
            to: r.mTeam.idTeam
        }),
        pembaca: r.one.tStatusBaca({
            from: r.tDokumen.idDokumen,
            to: r.tStatusBaca.idDokumen,
        })
        // pembaca: r.many.mUserProfiles({
        //     from: r.tDokumen.idDokumen.through(r.tStatusBaca.idDokumen),
        //     to: r.mUserProfiles.idUser.through(r.tStatusBaca.idPembaca)
        // })
    },
    tStatusBaca: {
        pembaca: r.one.mUserProfiles({
            from: r.tStatusBaca.idPembaca,
            to: r.mUserProfiles.idUser
        })
    },
    mUserProfiles: {
        team: r.many.mTeam({
            from: r.mUserProfiles.idUser.through(r.mTeamMember.idUser),
            to: r.mTeam.idTeam.through(r.mTeamMember.idTeam)
        }),
        userAccount: r.one.mUsers({
            from: r.mUserProfiles.idUser,
            to: r.mUsers.idUser
        })
    },
    mSubSkill: {
        pic: r.one.mUserProfiles({
            from: r.mSubSkill.idPic,
            to: r.mUserProfiles.idUser
        }),
        skill: r.one.mSkill({
            from: r.mSubSkill.idSkill,
            to: r.mSkill.idSkill
        })
    },
    tKuisQuestion: {
        options: r.many.tKuisQuestionOption({
            from: r.tKuisQuestion.idKuisQuestion,
            to: r.tKuisQuestionOption.idKuisQuestion
        }),
        correctOption: r.one.tKuisQuestionOption({
            from: [r.tKuisQuestion.idKuisQuestion, r.tKuisQuestion.answerOption],
            to: [r.tKuisQuestionOption.idKuisQuestion, r.tKuisQuestionOption.option],
        })
    }

}));