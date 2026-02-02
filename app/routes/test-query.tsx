import { db } from "database/connect";
import type { Route } from "./+types/test-query";
import { mSkill, mSubSkill, tDokumen, tStatusBaca } from "database/schema";
import { and, eq, sql } from "drizzle-orm";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const t_statBaca = await db.select({
        idPembaca: tStatusBaca.idPembaca,
        jumlahDokumen: sql<number>`cast(count(${tStatusBaca.idDokumen}) as int)`,
    }).from(mSubSkill)
        .leftJoin(tDokumen, eq(tStatusBaca.idDokumen, tDokumen.idDokumen))
        .leftJoin(mSubSkill, eq(tDokumen.idDokumen, mSubSkill.idDokumen))
        .where(eq(tStatusBaca.idPembaca, "8a623469-4b42-4bf2-8bd9-7dc38ce10f5d"))
        .groupBy(tStatusBaca.idPembaca)
    // .as("t_statBaca");

    return { t_statBaca }
}