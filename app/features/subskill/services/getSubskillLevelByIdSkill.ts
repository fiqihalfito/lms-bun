import { db } from "database/connect";
import { mSubSkill, tKuisProgress, tStatusBaca } from "database/schema";
import { eq, and, sql, asc, gte } from "drizzle-orm";

export const getLevelSubskillListDataByIdSkill = async (skillId: string, userId: string) => {
    // const levelDataRaw = await db
    //     .select({
    //         level: mSubSkill.level,
    //         // 1. Rata-rata Skor (Setiap Subskill dihitung, null = 0)
    //         averageLevelScore: sql<number>`
    //     AVG(COALESCE((${tKuisProgress.jumlahBenar}::float / NULLIF(${tKuisProgress.jumlahSoal}, 0)) * 100, 0))
    //   `.mapWith(Number),

    //         // 2. Info Kuantitas
    //         totalSubSkills: sql<number>`COUNT(${mSubSkill.idSubSkill})`.mapWith(Number),

    //         // 3. Status Partisipasi
    //         subSkillsAttempted: sql<number>`
    //     COUNT(${tKuisProgress.idKuisProgress})
    //   `.mapWith(Number), // Berapa subskill yang sudah pernah diklik/mulai

    //         subSkillsPassed: sql<number>`
    //     COUNT(CASE WHEN (${tKuisProgress.jumlahBenar}::float / NULLIF(${tKuisProgress.jumlahSoal}, 0)) >= 0.8 THEN 1 END)
    //   `.mapWith(Number),

    //         // 4. Statistik Waktu (Total waktu pengerjaan di level ini)
    //         totalTimeSeconds: sql<number>`
    //     SUM(COALESCE(${tKuisProgress.totalWaktuPengerjaanDetik}, 0))
    //   `.mapWith(Number)
    //     })
    //     .from(mSubSkill)
    //     .leftJoin(tKuis, eq(mSubSkill.idKuis, tKuis.idKuis))
    //     .leftJoin(
    //         tKuisProgress,
    //         and(
    //             eq(tKuis.idKuis, tKuisProgress.idKuis),
    //             eq(tKuisProgress.idUser, userId)
    //         )
    //     )
    //     .where(eq(mSubSkill.idSkill, skillId))
    //     .groupBy(mSubSkill.level)
    //     .orderBy(asc(mSubSkill.level));

    // let isPreviousLevelPassed = true;

    // return levelDataRaw.map((item) => {
    //     const levelPercentage = Math.round(item.averageLevelScore);
    //     const isLocked = !isPreviousLevelPassed;
    //     const isCurrentLevelPassed = levelPercentage >= 80;

    //     // Simpan status untuk level berikutnya
    //     isPreviousLevelPassed = isCurrentLevelPassed;

    //     // Tambahan info untuk UI: Format waktu dari detik ke menit
    //     const timeFormatted = item.totalTimeSeconds > 60
    //         ? `${Math.floor(item.totalTimeSeconds / 60)}m ${item.totalTimeSeconds % 60}s`
    //         : `${item.totalTimeSeconds}s`;

    //     return {
    //         level: item.level,
    //         levelTitle: `Level ${item.level}`,
    //         levelPercentage: levelPercentage,
    //         status: {
    //             isLocked,
    //             isPassed: isCurrentLevelPassed,
    //             canStart: !isLocked && levelPercentage < 100,
    //             isCompleted: levelPercentage === 100
    //         },
    //         stats: {
    //             progressText: `${item.subSkillsPassed} / ${item.totalSubSkills} Subskills Lulus`,
    //             unattemptedCount: item.totalSubSkills - item.subSkillsAttempted,
    //             totalTimeSpent: timeFormatted,
    //             rawSeconds: item.totalTimeSeconds
    //         },
    //         // Badge atau Label (Opsional untuk UI)
    //         label: isCurrentLevelPassed ? "Mastered" : (isLocked ? "Locked" : "In Progress")
    //     };
    // });
    const t_statBaca = db.select({
        idDokumen: tStatusBaca.idDokumen,
        idPembaca: tStatusBaca.idPembaca
    }).from(tStatusBaca)
        .where(eq(tStatusBaca.idPembaca, "c5c966fa-5081-462f-b0d5-493addfe7131"))
        .as("t_statBaca");

    const t_statKuis = db.select({
        idKuis: tKuisProgress.idKuis,
        idUser: tKuisProgress.idUser,
        totalScore: tKuisProgress.totalScore,
        jumlahSoal: tKuisProgress.jumlahSoal,
    }).from(tKuisProgress)
        .where(
            and(
                eq(tKuisProgress.idUser, "c5c966fa-5081-462f-b0d5-493addfe7131"),
                gte(sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`, 80)
            )
        )
        .as("t_statKuis");

    const t_levelsubskill = await db.select({
        level: mSubSkill.level,
        jumlahSubskillPerLevel: sql<number>`cast(count(${mSubSkill.level}) as int)`.as("jumlahSubskillPerLevel"),
        sudahBaca: sql<number>`cast(count(${t_statBaca.idDokumen}) as int)`.as("sudahBaca"),
        lulusKuis: sql<number>`cast(count(${t_statKuis.idKuis}) as int)`.as("lulusKuis"),
        isUnlocked: sql`
                CASE
                    WHEN ${mSubSkill.level} = 1 THEN true
                    WHEN
                    count(${t_statBaca.idDokumen}) = count(${mSubSkill.level})
                    AND
                    count(${t_statKuis.idKuis}) = count(${mSubSkill.level})
                    THEN true
                    ELSE false
                END
                `.mapWith(Boolean).as("isUnlocked"),
        isCompleted: sql`
            CASE
                WHEN
                    count(${t_statBaca.idDokumen}) = count(${mSubSkill.level})
                    AND
                    count(${t_statKuis.idKuis}) = count(${mSubSkill.level})
                THEN true
                ELSE false
            END
            `.mapWith(Boolean).as("isCompleted"),
        persentasePerLevel: sql`
                (
                    count(${t_statBaca.idDokumen}) + count(${t_statKuis.idKuis})
                )::float
                * 100 / (2 * count(${mSubSkill.level}))
                `.mapWith(Number).as("persentasePerLevel")
    }).from(mSubSkill)
        .leftJoin(t_statBaca, eq(t_statBaca.idDokumen, mSubSkill.idDokumen))
        .leftJoin(t_statKuis, eq(t_statKuis.idKuis, mSubSkill.idKuis))
        .groupBy(mSubSkill.level)
        .where(eq(mSubSkill.idSkill, "a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1"))
        .orderBy(mSubSkill.level)

    return t_levelsubskill
};