import { db } from "database/connect.server";
import { mSkill, mSubSkill, tKuisProgress, tStatusBaca } from "database/schema";
import { and, count, eq, getColumns, gte, sql } from "drizzle-orm";

export abstract class SubskillQuery {
  static async findByIdWithSkill(idSubskill: string) {
    const res = await db.query.mSubSkill.findFirst({
      where: {
        idSubSkill: idSubskill,
      },
      with: {
        skill: {
          columns: {
            namaSkill: true,
            idSkill: true,
          },
        },
      },
    });
    return res;
  }

  static async findByIdSkillAndLevel(
    idSkill: string,
    level: number,
    idPembaca: string,
  ) {
    const res = await db.query.mSubSkill.findMany({
      where: {
        idSkill: idSkill,
        level: level,
      },
      orderBy: {
        urutan: "asc",
      },
      with: {
        kuis: {
          with: {
            questions: {
              columns: {
                idKuisQuestion: true,
              },
            },
          },
        },
        dokumen: {
          with: {
            statusBacaOne: {
              where: {
                idPembaca: idPembaca,
              },
            },
          },
        },
        pic: true,
        kuisProgress: {
          where: {
            idUser: idPembaca,
          },
          extras: {
            persentaseBenar: (table) =>
              sql<number>`(${table.jumlahBenar} * 100.0) / NULLIF(${table.jumlahSoal}, 0)`,
          },
        },
      },
    });
    return res;
  }

  static async findSubskillStatPerLevel(
    idSkill: string,
    level: number,
    idUser: string,
  ) {
    const rawStat = db
      .select({
        jumlahSudahBaca:
          sql<number>`cast(count(${tStatusBaca.idStatusBaca}) as integer)`.as(
            "jumlahSudahBaca",
          ),
        jumlahSudahKuis:
          sql<number>`cast(count(${tKuisProgress.idKuisProgress}) as integer)`.as(
            "jumlahSudahKuis",
          ),
        jumlahSubskillPerLevel:
          sql<number>`cast(count(${mSubSkill.idSubSkill}) as integer)`.as(
            "jumlahSubskillPerLevel",
          ),
      })
      .from(mSubSkill)
      .leftJoin(
        tStatusBaca,
        and(
          eq(tStatusBaca.idDokumen, mSubSkill.idDokumen),
          eq(tStatusBaca.idPembaca, idUser),
        ),
      )
      .leftJoin(
        tKuisProgress,
        and(
          eq(tKuisProgress.idKuis, mSubSkill.idKuis),
          eq(tKuisProgress.idUser, idUser),
          gte(
            sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`,
            80,
          ),
        ),
      )
      .where(and(eq(mSubSkill.level, level), eq(mSubSkill.idSkill, idSkill)))
      .groupBy(mSubSkill.idSkill, mSubSkill.level)
      .as("rawStat");

    const persentaseStat = await db
      .select({
        ...getColumns(rawStat),
        persentaseProgress: sql<number>`(((
                      ${rawStat.jumlahSudahBaca} + ${rawStat.jumlahSudahKuis}
                  )::float / 2) / ${rawStat.jumlahSubskillPerLevel}) * 100`.as(
          "persentaseProgress",
        ),
      })
      .from(rawStat);
    return persentaseStat[0];
  }

  static async findLevelSubskillListDataByIdSkill(
    skillId: string,
    userId: string,
  ) {
    const t_statBaca = db
      .select({
        idDokumen: tStatusBaca.idDokumen,
        idPembaca: tStatusBaca.idPembaca,
      })
      .from(tStatusBaca)
      .where(eq(tStatusBaca.idPembaca, userId))
      .as("t_statBaca");

    const t_statKuis = db
      .select({
        idKuis: tKuisProgress.idKuis,
        idUser: tKuisProgress.idUser,
        totalScore: tKuisProgress.totalScore,
        jumlahSoal: tKuisProgress.jumlahSoal,
        totalWaktuPengerjaanDetik: tKuisProgress.totalWaktuPengerjaanDetik,
      })
      .from(tKuisProgress)
      .where(
        and(
          eq(tKuisProgress.idUser, userId),
          gte(
            sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`,
            80,
          ),
        ),
      )
      .as("t_statKuis");

    const t_levelsubskill = db
      .select({
        level: mSubSkill.level,
        jumlahSubskillPerLevel:
          sql<number>`cast(count(${mSubSkill.idSubSkill}) as int)`.as(
            "jumlahSubskillPerLevel",
          ),
        sudahBaca: sql<number>`cast(count(${t_statBaca.idDokumen}) as int)`.as(
          "sudahBaca",
        ),
        lulusKuis: sql<number>`cast(count(${t_statKuis.idKuis}) as int)`.as(
          "lulusKuis",
        ),
        // isUnlocked: sql`
        //         CASE
        //             WHEN ${mSubSkill.level} = 1 THEN true
        //             WHEN
        //             count(${t_statBaca.idDokumen}) >= (count(${mSubSkill.level}) - 1)
        //             AND
        //             count(${t_statKuis.idKuis}) >= (count(${mSubSkill.level}) - 1) * 0.8
        //             THEN true
        //             ELSE false
        //         END
        //         `.mapWith(Boolean).as("isUnlocked"),
        isCompleted: sql`
              CASE
                  WHEN
                      count(${t_statBaca.idDokumen}) = count(${mSubSkill.level})
                      AND
                      count(${t_statKuis.idKuis}) = count(${mSubSkill.level})
                  THEN true
                  ELSE false
              END
              `
          .mapWith(Boolean)
          .as("isCompleted"),

        persentasePerLevel: sql`
                  (
                      count(${t_statBaca.idDokumen}) + count(${t_statKuis.idKuis})
                  )::float
                  * 100 / (2 * count(${mSubSkill.level}))
                  `
          .mapWith(Number)
          .as("persentasePerLevel"),
        totalWaktuPengerjaan:
          sql`coalesce(sum(${t_statKuis.totalWaktuPengerjaanDetik}), 0)`
            .mapWith(Number)
            .as("totalWaktuPengerjaan"),
      })
      .from(mSubSkill)
      .leftJoin(t_statBaca, eq(t_statBaca.idDokumen, mSubSkill.idDokumen))
      .leftJoin(t_statKuis, eq(t_statKuis.idKuis, mSubSkill.idKuis))
      .groupBy(mSubSkill.level)
      .where(eq(mSubSkill.idSkill, skillId))
      .orderBy(mSubSkill.level)
      .as("t_levelsubskill");

    const col_tLevelSubskill = getColumns(t_levelsubskill);
    const t_unlockedLevelSubskill = await db
      .select({
        ...col_tLevelSubskill,
        isUnlocked:
          sql`LAG(${t_levelsubskill.isCompleted}, 1, true) OVER (ORDER BY ${t_levelsubskill.level})`
            .mapWith(Boolean)
            .as("isUnlocked"),
      })
      .from(t_levelsubskill);

    return t_unlockedLevelSubskill;
  }

  static async findSkillsByIdPicSubSkill(idPic: string) {
    const uniqueSkills = await db
      .select({
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        jumlahSubkill: count(mSubSkill.idSubSkill),
        jumlahUpload: count(mSubSkill.idDokumen),
      })
      .from(mSkill)
      .innerJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
      .where(eq(mSubSkill.idPic, idPic))
      .groupBy(mSkill.idSkill, mSkill.namaSkill)
      .orderBy(mSkill.namaSkill);

    return uniqueSkills;
  }

  static async findSubSkillByIdPIC(idPIC: string, idSkill: string) {
    const data = await db.query.mSubSkill.findMany({
      where: {
        idPic: idPIC,
        idSkill: idSkill,
      },
      orderBy: {
        level: "asc",
        urutan: "asc",
      },
      with: {
        pic: {
          columns: {
            namaUser: true,
          },
        },
        kuis: {
          with: {
            questions: {
              columns: {
                idKuisQuestion: true,
              },
            },
          },
        },
      },
    });

    return data;
  }

  static async findIdDokumenByIdSubSkill(idSubSkill: string) {
    const res = await db
      .select({
        idDokumen: mSubSkill.idDokumen,
      })
      .from(mSubSkill)
      .where(eq(mSubSkill.idSubSkill, idSubSkill));

    return res.length > 0 ? res[0].idDokumen : null;
  }

  static async findSkillProgressDetailByIdSkill(
    idSkill: string,
    idPic: string,
  ) {
    const res = await db
      .select({
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        jumlahSubkill: count(mSubSkill.idSubSkill),
        jumlahUpload: count(mSubSkill.idDokumen),
      })
      .from(mSkill)
      .innerJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
      .where(and(eq(mSubSkill.idPic, idPic), eq(mSkill.idSkill, idSkill)))
      .groupBy(mSkill.idSkill, mSkill.namaSkill)
      .orderBy(mSkill.namaSkill)
      .limit(1);

    return res;
  }

  static async findSubskillByIdSkill(idSkill: string) {
    const res = await db
      .select()
      .from(mSubSkill)
      .where(eq(mSubSkill.idSkill, idSkill));
    return res;
  }

  static async findIdPICExist(idPic: string) {
    const res = await db.query.mSubSkill.findFirst({
      where: {
        idPic: idPic,
      },
    });
    return !!res;
  }
}
