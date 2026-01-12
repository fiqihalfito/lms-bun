import { db } from "database/connect";
import { mSubSkill, tKuis, tKuisProgress } from "database/schema";
import { eq, and, sql, asc } from "drizzle-orm";

export const getLevelSubskillListDataByIdSkill = async (skillId: string, userId: string) => {
    const levelDataRaw = await db
        .select({
            level: mSubSkill.level,
            // 1. Rata-rata Skor (Setiap Subskill dihitung, null = 0)
            averageLevelScore: sql<number>`
        AVG(COALESCE((${tKuisProgress.jumlahBenar}::float / NULLIF(${tKuisProgress.jumlahSoal}, 0)) * 100, 0))
      `.mapWith(Number),

            // 2. Info Kuantitas
            totalSubSkills: sql<number>`COUNT(${mSubSkill.idSubSkill})`.mapWith(Number),

            // 3. Status Partisipasi
            subSkillsAttempted: sql<number>`
        COUNT(${tKuisProgress.idKuisProgress})
      `.mapWith(Number), // Berapa subskill yang sudah pernah diklik/mulai

            subSkillsPassed: sql<number>`
        COUNT(CASE WHEN (${tKuisProgress.jumlahBenar}::float / NULLIF(${tKuisProgress.jumlahSoal}, 0)) >= 0.8 THEN 1 END)
      `.mapWith(Number),

            // 4. Statistik Waktu (Total waktu pengerjaan di level ini)
            totalTimeSeconds: sql<number>`
        SUM(COALESCE(${tKuisProgress.totalWaktuPengerjaanDetik}, 0))
      `.mapWith(Number)
        })
        .from(mSubSkill)
        .leftJoin(tKuis, eq(mSubSkill.idKuis, tKuis.idKuis))
        .leftJoin(
            tKuisProgress,
            and(
                eq(tKuis.idKuis, tKuisProgress.idKuis),
                eq(tKuisProgress.idUser, userId)
            )
        )
        .where(eq(mSubSkill.idSkill, skillId))
        .groupBy(mSubSkill.level)
        .orderBy(asc(mSubSkill.level));

    let isPreviousLevelPassed = true;

    return levelDataRaw.map((item) => {
        const levelPercentage = Math.round(item.averageLevelScore);
        const isLocked = !isPreviousLevelPassed;
        const isCurrentLevelPassed = levelPercentage >= 80;

        // Simpan status untuk level berikutnya
        isPreviousLevelPassed = isCurrentLevelPassed;

        // Tambahan info untuk UI: Format waktu dari detik ke menit
        const timeFormatted = item.totalTimeSeconds > 60
            ? `${Math.floor(item.totalTimeSeconds / 60)}m ${item.totalTimeSeconds % 60}s`
            : `${item.totalTimeSeconds}s`;

        return {
            level: item.level,
            levelTitle: `Level ${item.level}`,
            levelPercentage: levelPercentage,
            status: {
                isLocked,
                isPassed: isCurrentLevelPassed,
                canStart: !isLocked && levelPercentage < 100,
                isCompleted: levelPercentage === 100
            },
            stats: {
                progressText: `${item.subSkillsPassed} / ${item.totalSubSkills} Subskills Lulus`,
                unattemptedCount: item.totalSubSkills - item.subSkillsAttempted,
                totalTimeSpent: timeFormatted,
                rawSeconds: item.totalTimeSeconds
            },
            // Badge atau Label (Opsional untuk UI)
            label: isCurrentLevelPassed ? "Mastered" : (isLocked ? "Locked" : "In Progress")
        };
    });
};