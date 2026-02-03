import { db } from "database/connect";
import type { Route } from "./+types/test-query";
import { mSubSkill, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, gte, sql } from "drizzle-orm";

export async function loader({ request, params, context }: Route.LoaderArgs) {
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
        totalWaktuPengerjaanDetik: tKuisProgress.totalWaktuPengerjaanDetik
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
                `.mapWith(Number).as("persentasePerLevel"),
        totalWaktuPengerjaan: sql`coalesce(sum(${t_statKuis.totalWaktuPengerjaanDetik}), 0)`.mapWith(Number).as("totalWaktuPengerjaan")
    }).from(mSubSkill)
        .leftJoin(t_statBaca, eq(t_statBaca.idDokumen, mSubSkill.idDokumen))
        .leftJoin(t_statKuis, eq(t_statKuis.idKuis, mSubSkill.idKuis))
        .groupBy(mSubSkill.level)
        .where(eq(mSubSkill.idSkill, "a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1"))
        .orderBy(mSubSkill.level)

    return { t_levelsubskill }
}