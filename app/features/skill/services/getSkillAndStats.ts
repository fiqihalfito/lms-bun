import { db } from "database/connect";
import { mSkill, mSubSkill, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, gte, sql } from "drizzle-orm";

export type GroupLevelType = Record<string, {
    jumlahSubskill: number;
    sudahBaca: number;
    lulusKuis: number;
}>

export async function getSkillAndStats(idUser: string, idTeam: string) {

    const t_statBaca = db.select({
        idDokumen: tStatusBaca.idDokumen,
        idPembaca: tStatusBaca.idPembaca
    }).from(tStatusBaca)
        .where(eq(tStatusBaca.idPembaca, "c5c966fa-5081-462f-b0d5-493addfe7131"))
        .as("t_statBaca");

    const t_statKuis = db.select({
        idKuis: tKuisProgress.idKuis,
        idUser: tKuisProgress.idUser,
        persentase: sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`.as("persentase")
    }).from(tKuisProgress)
        .where(
            and(
                eq(tKuisProgress.idUser, "c5c966fa-5081-462f-b0d5-493addfe7131"),
                gte(sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`, 80)
            )
        )
        .as("t_statKuis");

    const t_subskilllevel = db.select({
        idSkill: mSubSkill.idSkill,
        level: mSubSkill.level,
        jumlahSubskill: sql`cast(count(${mSubSkill.idSubSkill}) as int)`.as("jumlahSubskill"),
        sudahBaca: sql`cast(count(${t_statBaca.idDokumen}) as int)`.as("sudahBaca"),
        lulusKuis: sql`cast(count(${t_statKuis.idKuis}) as int)`.as("lulusKuis")
    }).from(mSubSkill)
        .leftJoin(t_statBaca, eq(t_statBaca.idDokumen, mSubSkill.idDokumen))
        .leftJoin(t_statKuis, eq(t_statKuis.idKuis, mSubSkill.idKuis))
        .orderBy(mSubSkill.level)
        .groupBy(mSubSkill.idSkill, mSubSkill.level)
        .as("t_subskilllevel");

    const t_skill = await db.select({
        idSkill: mSkill.idSkill,
        namaSkill: mSkill.namaSkill,
        groupLevel: sql<GroupLevelType>`
            json_object_agg(
                ${t_subskilllevel.level},
                json_build_object(
                    'jumlahSubskill', ${t_subskilllevel.jumlahSubskill},
                    'sudahBaca', ${t_subskilllevel.sudahBaca},
                    'lulusKuis', ${t_subskilllevel.lulusKuis}
                )
                ORDER BY ${t_subskilllevel.level}
            )
        `.as("groupLevel"),
        totalSubskill: sql`sum(${t_subskilllevel.jumlahSubskill})`.mapWith(Number),
        totalBaca: sql`sum(${t_subskilllevel.sudahBaca})`.mapWith(Number),
        totalLulusKuis: sql`sum(${t_subskilllevel.lulusKuis})`.mapWith(Number),
        persentaseProgress: sql`((cast(sum(${t_subskilllevel.sudahBaca}) + sum(${t_subskilllevel.lulusKuis}) as float) / 2) * 100) / sum(${t_subskilllevel.jumlahSubskill})`.mapWith(Number).as("persentaseProgress"),
    }).from(mSkill)
        .leftJoin(t_subskilllevel, eq(mSkill.idSkill, t_subskilllevel.idSkill))
        .groupBy(mSkill.idSkill, mSkill.namaSkill)
        .where(eq(mSkill.idTeam, "aaaaaaaa-aaaa-4000-8000-000000000001"))

    return t_skill
}