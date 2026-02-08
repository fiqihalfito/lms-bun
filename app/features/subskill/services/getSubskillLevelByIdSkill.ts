import { db } from "database/connect";
import { mSubSkill, tKuisProgress, tStatusBaca } from "database/schema";
import { eq, and, sql, asc, gte } from "drizzle-orm";

export const getLevelSubskillListDataByIdSkill = async (skillId: string, userId: string) => {

    const t_statBaca = db.select({
        idDokumen: tStatusBaca.idDokumen,
        idPembaca: tStatusBaca.idPembaca
    }).from(tStatusBaca)
        .where(eq(tStatusBaca.idPembaca, userId))
        .as("t_statBaca");

    const t_statKuis = db.select({
        idKuis: tKuisProgress.idKuis,
        idUser: tKuisProgress.idUser,
        totalScore: tKuisProgress.totalScore,
        jumlahSoal: tKuisProgress.jumlahSoal,
        totalWaktuPengerjaanDetik: tKuisProgress.totalWaktuPengerjaanDetik
    }).from(tKuisProgress)
        .where(
            and(
                eq(tKuisProgress.idUser, userId),
                gte(sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`, 80)
            )
        )
        .as("t_statKuis");

    const t_levelsubskill = await db.select({
        level: mSubSkill.level,
        jumlahSubskillPerLevel: sql<number>`cast(count(${mSubSkill.idSubSkill}) as int)`.as("jumlahSubskillPerLevel"),
        sudahBaca: sql<number>`cast(count(${t_statBaca.idDokumen}) as int)`.as("sudahBaca"),
        lulusKuis: sql<number>`cast(count(${t_statKuis.idKuis}) as int)`.as("lulusKuis"),
        isUnlocked: sql`
                CASE
                    WHEN ${mSubSkill.level} = 1 THEN true
                    WHEN
                    count(${t_statBaca.idDokumen}) >= count(${mSubSkill.level})
                    AND
                    count(${t_statKuis.idKuis}) >= count(${mSubSkill.level}) * 0.8
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
                `.mapWith(Number).as("persentasePerLevel"),
        totalWaktuPengerjaan: sql`coalesce(sum(${t_statKuis.totalWaktuPengerjaanDetik}), 0)`.mapWith(Number).as("totalWaktuPengerjaan")
    }).from(mSubSkill)
        .leftJoin(t_statBaca, eq(t_statBaca.idDokumen, mSubSkill.idDokumen))
        .leftJoin(t_statKuis, eq(t_statKuis.idKuis, mSubSkill.idKuis))
        .groupBy(mSubSkill.level)
        .where(eq(mSubSkill.idSkill, skillId))
        .orderBy(mSubSkill.level)

    return t_levelsubskill
};