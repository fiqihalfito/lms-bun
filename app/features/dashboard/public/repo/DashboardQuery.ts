import { db } from "database/connect.server";
import {
  mSkill,
  mSubSkill,
  mTeam,
  mTeamMember,
  mUserProfiles,
  tKuisProgress,
  tStatusBaca,
} from "database/schema";
import { and, desc, eq, getColumns, gte, isNotNull, sql } from "drizzle-orm";

export abstract class DashboardQuery {
  static async findJumlahLulusPerSkill(idSubBidang?: string) {
    // ===== DB START =====
    // jumlah subskill per skill
    const subskillCount = db
      .select({
        idSkill: mSubSkill.idSkill,
        total: sql<number>`cast(count(*) as int)`.as("total"),
      })
      .from(mSubSkill)
      .groupBy(mSubSkill.idSkill)
      .as("subskill_count");

    // jumlah subskill lulus per user per skill
    const userPassCount = db
      .select({
        idSkill: mSubSkill.idSkill,
        idUser: tKuisProgress.idUser,
        passed: sql<number>`cast(count(*) as int)`.as("passed"),
      })
      .from(tKuisProgress)
      .innerJoin(mSubSkill, eq(mSubSkill.idKuis, tKuisProgress.idKuis))
      .where(
        and(
          isNotNull(tKuisProgress.completedAt),
          gte(
            sql`(${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal})`,
            80,
          ),
        ),
      )
      .groupBy(mSubSkill.idSkill, tKuisProgress.idUser)
      .as("user_pass_count");

    // user yang lulus semua subskill
    const userSkillLulus = db
      .select({
        idSkill: userPassCount.idSkill,
        idUser: userPassCount.idUser,
      })
      .from(userPassCount)
      .innerJoin(
        subskillCount,
        eq(userPassCount.idSkill, subskillCount.idSkill),
      )
      .where(eq(userPassCount.passed, subskillCount.total))
      .as("user_skill_lulus");

    // jumlah user lulus per skill
    const stat_lulus = db
      .select({
        idSkill: userSkillLulus.idSkill,
        jumlahLulus: sql<number>`cast(count(*) as int)`.as("jumlahLulus"),
      })
      .from(userSkillLulus)
      .groupBy(userSkillLulus.idSkill)
      .as("stat_lulus");

    // const stat_subskillx = db.select({
    //     jumlahLulus: sql<number>`cast(sum(${stat_kuis.jumlahLulus}) as int)`.as("jumlahLulus"),
    //     idSkill: mSubSkill.idSkill,
    // })
    //     .from(mSubSkill)
    //     .leftJoin(stat_kuis, eq(mSubSkill.idKuis, stat_kuis.idKuis))
    //     .groupBy(mSubSkill.idSkill)
    //     .as("stat_subskill")

    const stat_skill = db
      .select({
        jumlahLulus: sql<number>`coalesce(${stat_lulus.jumlahLulus}, 0)`
          .mapWith(Number)
          .as("jumlahLulus"),
        namaSkill: mSkill.namaSkill,
        idSkill: mSkill.idSkill,
        idTeam: mSkill.idTeam,
      })
      .from(mSkill)
      .leftJoin(stat_lulus, eq(mSkill.idSkill, stat_lulus.idSkill))
      .as("stat_skill");

    const stat_member_team = db
      .select({
        idTeam: mTeamMember.idTeam,
        jumlahOrangPerTeam:
          sql<number>`cast(count(${mTeamMember.idUser}) as int)`.as(
            "jumlahOrangPerTeam",
          ),
      })
      .from(mTeamMember)
      .groupBy(mTeamMember.idTeam)
      .as("stat_member_team");

    const { jumlahLulus, namaSkill } = getColumns(stat_skill);
    const { jumlahOrangPerTeam } = getColumns(stat_member_team);
    const stat_team = await db
      .select({
        jumlahLulus,
        namaSkill,
        namaTeam: mTeam.namaTeam,
        jumlahOrangPerTeam,
        idSubBidang: mTeam.idSubBidang,
      })
      .from(mTeam)
      .leftJoin(stat_skill, eq(mTeam.idTeam, stat_skill.idTeam))
      .leftJoin(stat_member_team, eq(mTeam.idTeam, stat_member_team.idTeam))
      .where(idSubBidang ? eq(mTeam.idSubBidang, idSubBidang) : undefined);

    return stat_team;

    // ===== DB END =====
  }

  static async findListIndividuSkill(idSubBidang?: string) {
    const t_lulus = db
      .select({
        idUser: tKuisProgress.idUser,
        idSkill: mSubSkill.idSkill,
        level: mSubSkill.level,
        jumlahSubskillLulusPerLevel:
          sql`cast(count(${mSubSkill.level}) as int)`.as(
            "jumlahSubskillLulusPerLevel",
          ),
      })
      .from(tKuisProgress)
      .innerJoin(mSubSkill, eq(tKuisProgress.idKuis, mSubSkill.idKuis))
      .where(
        and(
          gte(
            sql`(${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal})`,
            80,
          ),
        ),
      )
      .groupBy(tKuisProgress.idUser, mSubSkill.idSkill, mSubSkill.level)
      .orderBy(tKuisProgress.idUser, mSubSkill.level)
      .as("t_lulus");

    const t_jumlahSubskill = db
      .select({
        idSkill: mSubSkill.idSkill,
        level: mSubSkill.level,
        jumlahSubskill: sql<number>`count(*)`
          .mapWith(Number)
          .as("jumlahSubskill"),
      })
      .from(mSubSkill)
      .groupBy(mSubSkill.idSkill, mSubSkill.level)
      .orderBy(mSubSkill.idSkill, mSubSkill.level)
      .as("t_jumlahSubskill");

    const t_level_lulus = db
      .select({
        idUser: t_lulus.idUser,
        idSkill: t_lulus.idSkill,
        level: t_lulus.level,
        jumlahSubskillLulusPerLevel:
          sql`COALESCE(${t_lulus.jumlahSubskillLulusPerLevel}, 0)`
            .mapWith(Number)
            .as("jumlahSubskillLulusPerLevel"),
        jumlahSubskillTarget:
          sql`COALESCE(${t_jumlahSubskill.jumlahSubskill}, 0)`
            .mapWith(Number)
            .as("jumlahSubskillTarget"),
      })
      .from(t_lulus)
      .innerJoin(
        t_jumlahSubskill,
        and(
          eq(t_lulus.level, t_jumlahSubskill.level),
          eq(t_lulus.idSkill, t_jumlahSubskill.idSkill),
        ),
      )
      .where(
        eq(
          t_lulus.jumlahSubskillLulusPerLevel,
          t_jumlahSubskill.jumlahSubskill,
        ),
      )
      .as("t_level_lulus");
    // return { t_level_lulus }

    // khusus postgresql, gunakan distinct on order by untuk ambil 1 row dengan level tertinggi misalnya
    // distinct on [kolom] menghapus row dengan kolom duplikat dan ambil yang paling atas saja (ini dikarenakan sudah order by)
    // contoh:
    // select distinct on (idUser, idSkill) * from t_level_lulus order by idUser, idSkill, level desc
    // Kalau:
    // DISTINCT ON (A, B, C)
    // Maka wajib:
    // ORDER BY A, B, C, ...
    // Itu rule absolut.
    const t_level_lulus_tertinggi = db
      .selectDistinctOn([t_level_lulus.idUser, t_level_lulus.idSkill])
      .from(t_level_lulus)
      .orderBy(
        t_level_lulus.idUser,
        t_level_lulus.idSkill,
        desc(t_level_lulus.level),
      )
      .as("t_level_lulus_tertinggi");
    // selain metode distinct on di postgresql, alternatif bisa pakai row_number() over (partition by ... order by ...)
    // contoh:
    // select * from (
    //     select
    //         *,
    //         row_number() over (partition by idUser, idSkill order by level desc) as rn
    //     from t_level_lulus
    // ) as t_level_lulus_tertinggi
    // where rn = 1

    const t_level_lulus_tertinggi_col = getColumns(t_level_lulus_tertinggi);
    const t_joinedUserSkill = await db
      .select({
        ...t_level_lulus_tertinggi_col,
        idUser: mUserProfiles.idUser,
        namaUser: mUserProfiles.namaUser,
        namaTeam: mTeam.namaTeam,
        namaSkill: mSkill.namaSkill,
      })
      .from(mUserProfiles)
      // .leftJoin(mTeamMember, and(
      //     eq(mUserProfiles.idUser, mTeamMember.idUser),
      //     isNotNull(mTeamMember.idTeam)
      // ))
      // .leftJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam))
      .innerJoin(
        mTeamMember,
        and(
          eq(mUserProfiles.idUser, mTeamMember.idUser),
          isNotNull(mTeamMember.idTeam),
        ),
      )
      .innerJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam))
      .leftJoin(
        t_level_lulus_tertinggi,
        eq(mUserProfiles.idUser, t_level_lulus_tertinggi.idUser),
      )
      .leftJoin(mSkill, eq(t_level_lulus_tertinggi.idSkill, mSkill.idSkill))
      .where(
        and(
          idSubBidang ? eq(mUserProfiles.idSubBidang, idSubBidang) : undefined,
          isNotNull(mTeamMember.idTeam),
        ),
      )
      .orderBy(mTeam.namaTeam, mUserProfiles.namaUser);

    return t_joinedUserSkill;
  }

  static async findUserSkillIndicator(idUser: string) {
    const user_subskill_lulus_baca = db
      .select({
        idSubSkill: mSubSkill.idSubSkill,
        idUser: tStatusBaca.idPembaca,
        isLulus:
          sql<boolean>`(${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}) >= 80`.as(
            "isLulus",
          ),
        isBaca:
          sql<boolean>`CASE WHEN ${tStatusBaca.idPembaca} IS NOT NULL THEN true ELSE false END`.as(
            "isBaca",
          ),
      })
      .from(tStatusBaca)
      .leftJoin(mSubSkill, eq(mSubSkill.idDokumen, tStatusBaca.idDokumen))
      .leftJoin(
        tKuisProgress,
        and(
          eq(mSubSkill.idKuis, tKuisProgress.idKuis),
          eq(tStatusBaca.idPembaca, tKuisProgress.idUser),
        ),
      )
      .as("user_subskill_lulus_baca");

    const user_x_skill_x_subskill = db
      .select({
        idTeam: mTeamMember.idTeam,
        namaTeam: mTeam.namaTeam,
        idUser: mTeamMember.idUser,
        namaUser: mUserProfiles.namaUser,
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        idSubSkill: mSubSkill.idSubSkill,
        namaSubSkill: mSubSkill.namaSubSkill,
        levelSubskill: mSubSkill.level,
      })
      .from(mTeamMember) // single row
      .leftJoin(mTeam, eq(mTeamMember.idTeam, mTeam.idTeam)) // single row
      .leftJoin(mUserProfiles, eq(mTeamMember.idUser, mUserProfiles.idUser)) // single row
      .leftJoin(mSkill, eq(mTeamMember.idTeam, mSkill.idTeam)) // multiple rows
      .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill)) // multiple rows
      .where(and(isNotNull(mTeamMember.idTeam), eq(mTeamMember.idUser, idUser)))
      .orderBy(
        mTeam.namaTeam,
        mUserProfiles.namaUser,
        mSkill.namaSkill,
        mSubSkill.level,
      )
      .as("user_x_skill_x_subskill");
    // team -> user -> skill -> subskill

    const user_x_subskill_lulus_baca = await db
      .select({
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
        isBaca: user_subskill_lulus_baca.isBaca,
      })
      .from(user_x_skill_x_subskill)
      .leftJoin(
        user_subskill_lulus_baca,
        and(
          eq(user_x_skill_x_subskill.idUser, user_subskill_lulus_baca.idUser),
          eq(
            user_x_skill_x_subskill.idSubSkill,
            user_subskill_lulus_baca.idSubSkill,
          ),
        ),
      );
    // .where(idTeam ? eq(user_x_skill_x_subskill.idTeam, idTeam) : undefined)
    // tes beberapa user aja
    // .where(or(
    //     eq(user_x_skill_x_subskill.idUser, "c5c966fa-5081-462f-b0d5-493addfe7131"),
    //     eq(user_x_skill_x_subskill.idUser, "9f42c1c4-0813-4ea5-8cf8-aacefee73d97")
    // ))
    // tes single user
    // .where(eq(user_x_skill_x_subskill.idUser, idUser))

    return user_x_subskill_lulus_baca;
  }
}
