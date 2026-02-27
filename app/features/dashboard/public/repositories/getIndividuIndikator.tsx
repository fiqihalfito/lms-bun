import { db } from "database/connect.server"
import { mSkill, mSubSkill, mTeam, mTeamMember, mUserProfiles, tKuisProgress, tStatusBaca } from "database/schema"
import { and, eq, isNotNull, or, sql } from "drizzle-orm"


export async function getIndividuIndikator() {


    // optimasi ini
    const user_subskill_lulus_baca = db.select({
        idSubSkill: mSubSkill.idSubSkill,
        idUser: tStatusBaca.idPembaca,
        isLulus: sql<boolean>`(${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}) >= 80`.as("isLulus"),
        isBaca: sql<boolean>`CASE WHEN ${tStatusBaca.idPembaca} IS NOT NULL THEN true ELSE false END`.as("isBaca"),
    })
        .from(tStatusBaca)
        .leftJoin(mSubSkill, eq(mSubSkill.idDokumen, tStatusBaca.idDokumen))
        .leftJoin(tKuisProgress, and(eq(mSubSkill.idKuis, tKuisProgress.idKuis), eq(tStatusBaca.idPembaca, tKuisProgress.idUser)))
        .as("user_subskill_lulus_baca")


    const user_x_skill_x_subskill = db.select({
        idTeam: mTeamMember.idTeam,
        namaTeam: mTeam.namaTeam,
        idUser: mTeamMember.idUser,
        namaUser: mUserProfiles.namaUser,
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        idSubSkill: mSubSkill.idSubSkill,
        namaSubSkill: mSubSkill.namaSubSkill,
        levelSubskill: mSubSkill.level
    })
        .from(mTeamMember) // single row
        .leftJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam)) // single row
        .leftJoin(mUserProfiles, eq(mTeamMember.idUser, mUserProfiles.idUser)) // single row
        .leftJoin(mSkill, eq(mTeamMember.idTeam, mSkill.idTeam)) // multiple rows
        .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill)) // multiple rows
        .where(isNotNull(mTeamMember.idTeam))
        .orderBy(mTeam.namaTeam, mUserProfiles.namaUser, mSkill.namaSkill, mSubSkill.level)
        .as("user_x_skill_x_subskill")
    // team -> user -> skill -> subskill


    const user_x_subskill_lulus_baca = await db.select({
        // idTeam: user_x_skill_x_subskill.idTeam,
        namaTeam: user_x_skill_x_subskill.namaTeam,
        // idUser: user_x_skill_x_subskill.idUser,
        namaUser: user_x_skill_x_subskill.namaUser,
        // idSkill: user_x_skill_x_subskill.idSkill,
        namaSkill: user_x_skill_x_subskill.namaSkill,
        idSubSkill: user_x_skill_x_subskill.idSubSkill,
        namaSubSkill: user_x_skill_x_subskill.namaSubSkill,
        levelSubskill: user_x_skill_x_subskill.levelSubskill,
        isLulus: user_subskill_lulus_baca.isLulus,
        isBaca: user_subskill_lulus_baca.isBaca
    })
        .from(user_x_skill_x_subskill)
        .leftJoin(user_subskill_lulus_baca, and(
            eq(user_x_skill_x_subskill.idUser, user_subskill_lulus_baca.idUser),
            eq(user_x_skill_x_subskill.idSubSkill, user_subskill_lulus_baca.idSubSkill)
        ))
        // tes beberapa user aja
        .where(or(
            eq(user_x_skill_x_subskill.idUser, "c5c966fa-5081-462f-b0d5-493addfe7131"),
            eq(user_x_skill_x_subskill.idUser, "9f42c1c4-0813-4ea5-8cf8-aacefee73d97")
        ))

    return user_x_subskill_lulus_baca

}