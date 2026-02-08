import { db } from "database/connect";
import { mSubSkill, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, getColumns, gte, sql } from "drizzle-orm";

export async function getSubskillStatPerLevel(idSkill: string, level: number, idUser: string) {
    const rawStat = db.select(
        {
            jumlahSudahBaca: sql<number>`cast(count(${tStatusBaca.idStatusBaca}) as integer)`.as("jumlahSudahBaca"),
            jumlahSudahKuis: sql<number>`cast(count(${tKuisProgress.idKuisProgress}) as integer)`.as("jumlahSudahKuis"),
            jumlahSubskillPerLevel: sql<number>`cast(count(${mSubSkill.idSubSkill}) as integer)`.as("jumlahSubskillPerLevel")
        }
    )
        .from(mSubSkill)
        .leftJoin(tStatusBaca, and(eq(tStatusBaca.idDokumen, mSubSkill.idDokumen), eq(tStatusBaca.idPembaca, idUser)))
        .leftJoin(tKuisProgress, and(eq(tKuisProgress.idKuis, mSubSkill.idKuis), eq(tKuisProgress.idUser, idUser), gte(sql`${tKuisProgress.totalScore} * 100 / ${tKuisProgress.jumlahSoal}`, 80)))
        .where(
            and(
                eq(mSubSkill.level, level),
                eq(mSubSkill.idSkill, idSkill)
            )
        )
        .groupBy(mSubSkill.idSkill, mSubSkill.level).as("rawStat")

    const persentaseStat = await db.select(
        {
            ...getColumns(rawStat),
            persentaseProgress: sql<number>`(((
                    ${rawStat.jumlahSudahBaca} + ${rawStat.jumlahSudahKuis}
                )::float / 2) / ${rawStat.jumlahSubskillPerLevel}) * 100`.as("persentaseProgress")
        }
    )
        .from(rawStat)
    return persentaseStat[0]
}