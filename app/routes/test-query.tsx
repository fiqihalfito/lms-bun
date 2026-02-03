import { db } from "database/connect";
import type { Route } from "./+types/test-query";
import { mSkill, mSubSkill, mUserProfiles, tDokumen, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, gte, sql } from "drizzle-orm";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // Skill Card View
    // const t_statBaca = db.select({
    //     idDokumen: tStatusBaca.idDokumen,
    //     idPembaca: tStatusBaca.idPembaca
    // }).from(tStatusBaca)
    //     .where(eq(tStatusBaca.idPembaca, "c5c966fa-5081-462f-b0d5-493addfe7131"))
    //     .as("t_statBaca");

    // const t_statKuis = db.select({
    //     idKuis: tKuisProgress.idKuis,
    //     idUser: tKuisProgress.idUser,
    //     persentase: sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`.as("persentase")
    // }).from(tKuisProgress)
    //     .where(
    //         and(
    //             eq(tKuisProgress.idUser, "c5c966fa-5081-462f-b0d5-493addfe7131"),
    //             gte(sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`, 80)
    //         )
    //     )
    //     .as("t_statKuis");

    // const t_subskilllevel = db.select({
    //     idSkill: mSubSkill.idSkill,
    //     level: mSubSkill.level,
    //     jumlahSubskill: sql`cast(count(${mSubSkill.idSubSkill}) as int)`.as("jumlahSubskill"),
    //     sudahBaca: sql`cast(count(${t_statBaca.idDokumen}) as int)`.as("sudahBaca"),
    //     lulusKuis: sql`cast(count(${t_statKuis.idKuis}) as int)`.as("lulusKuis")
    // }).from(mSubSkill)
    //     .leftJoin(t_statBaca, eq(t_statBaca.idDokumen, mSubSkill.idDokumen))
    //     .leftJoin(t_statKuis, eq(t_statKuis.idKuis, mSubSkill.idKuis))
    //     .orderBy(mSubSkill.level)
    //     .groupBy(mSubSkill.idSkill, mSubSkill.level)
    //     .as("t_subskilllevel");

    // const t_skill = await db.select({
    //     idSkill: mSkill.idSkill,
    //     namaSkill: mSkill.namaSkill,
    //     groupLevel: sql`
    //         json_object_agg(
    //             ${t_subskilllevel.level},
    //             json_build_object(
    //                 'jumlahSubskill', ${t_subskilllevel.jumlahSubskill},
    //                 'sudahBaca', ${t_subskilllevel.sudahBaca},
    //                 'lulusKuis', ${t_subskilllevel.lulusKuis}
    //             )
    //             ORDER BY ${t_subskilllevel.level}
    //         )
    //     `.as("groupLevel"),
    //     totalSubskill: sql`sum(${t_subskilllevel.jumlahSubskill})`.mapWith(Number),
    //     totalBaca: sql`sum(${t_subskilllevel.sudahBaca})`.mapWith(Number),
    //     totalLulusKuis: sql`sum(${t_subskilllevel.lulusKuis})`.mapWith(Number),
    //     persentaseProgress: sql`((cast(sum(${t_subskilllevel.sudahBaca}) + sum(${t_subskilllevel.lulusKuis}) as float) / 2) * 100) / sum(${t_subskilllevel.jumlahSubskill})`.mapWith(Number).as("persentaseProgress"),
    // }).from(mSkill)
    //     .leftJoin(t_subskilllevel, eq(mSkill.idSkill, t_subskilllevel.idSkill))
    //     .groupBy(mSkill.idSkill, mSkill.namaSkill)
    //     .where(eq(mSkill.idTeam, "aaaaaaaa-aaaa-4000-8000-000000000001"))

    // ======================================================================================================

    // const t_statBaca = db.select({
    //     idDokumen: tStatusBaca.idDokumen,
    //     idPembaca: tStatusBaca.idPembaca
    // }).from(tStatusBaca)
    //     .where(eq(tStatusBaca.idPembaca, "c5c966fa-5081-462f-b0d5-493addfe7131"))
    //     .as("t_statBaca");

    // const t_statKuis = db.select({
    //     idKuis: tKuisProgress.idKuis,
    //     idUser: tKuisProgress.idUser,
    //     totalScore: tKuisProgress.totalScore,
    //     jumlahSoal: tKuisProgress.jumlahSoal,
    //     totalWaktuPengerjaanDetik: tKuisProgress.totalWaktuPengerjaanDetik
    // }).from(tKuisProgress)
    //     .where(
    //         and(
    //             eq(tKuisProgress.idUser, "c5c966fa-5081-462f-b0d5-493addfe7131"),
    //             gte(sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`, 80)
    //         )
    //     )
    //     .as("t_statKuis");

    // const t_levelsubskill = await db.select({
    //     level: mSubSkill.level,
    //     jumlahSubskillPerLevel: sql<number>`cast(count(${mSubSkill.level}) as int)`.as("jumlahSubskillPerLevel"),
    //     sudahBaca: sql<number>`cast(count(${t_statBaca.idDokumen}) as int)`.as("sudahBaca"),
    //     lulusKuis: sql<number>`cast(count(${t_statKuis.idKuis}) as int)`.as("lulusKuis"),
    //     isUnlocked: sql`
    //             CASE
    //                 WHEN ${mSubSkill.level} = 1 THEN true
    //                 WHEN
    //                 count(${t_statBaca.idDokumen}) = count(${mSubSkill.level})
    //                 AND
    //                 count(${t_statKuis.idKuis}) = count(${mSubSkill.level})
    //                 THEN true
    //                 ELSE false
    //             END
    //             `.mapWith(Boolean).as("isUnlocked"),
    //     isCompleted: sql`
    //         CASE
    //             WHEN
    //                 count(${t_statBaca.idDokumen}) = count(${mSubSkill.level})
    //                 AND
    //                 count(${t_statKuis.idKuis}) = count(${mSubSkill.level})
    //             THEN true
    //             ELSE false
    //         END
    //         `.mapWith(Boolean).as("isCompleted"),
    //     persentasePerLevel: sql`
    //             (
    //                 count(${t_statBaca.idDokumen}) + count(${t_statKuis.idKuis})
    //             )::float
    //             * 100 / (2 * count(${mSubSkill.level}))
    //             `.mapWith(Number).as("persentasePerLevel"),
    //     totalWaktuPengerjaan: sql`coalesce(sum(${t_statKuis.totalWaktuPengerjaanDetik}), 0)`.mapWith(Number).as("totalWaktuPengerjaan")
    // }).from(mSubSkill)
    //     .leftJoin(t_statBaca, eq(t_statBaca.idDokumen, mSubSkill.idDokumen))
    //     .leftJoin(t_statKuis, eq(t_statKuis.idKuis, mSubSkill.idKuis))
    //     .groupBy(mSubSkill.level)
    //     .where(eq(mSubSkill.idSkill, "a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1"))
    //     .orderBy(mSubSkill.level)

    // ======================================================================================================

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
        .leftJoin(mUserProfiles, eq(mUserProfiles.idUser, mSubSkill.idPic))
        .groupBy(mSubSkill.level)
        .where(and(eq(mSubSkill.idSkill, "a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1"), eq(mSubSkill.level, 1)))
        .orderBy(mSubSkill.level)

    // ======================================================================================================

    return { t_levelsubskill }
}