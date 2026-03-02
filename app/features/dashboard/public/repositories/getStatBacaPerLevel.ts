import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, mTeamMember, mUserProfiles, tStatusBaca } from "database/schema";
import { desc, eq, getColumns, sql } from "drizzle-orm";
import * as R from "remeda";

type getStatBacaPerLevelProp = {
    idSubBidang?: string
}

// 1. Definisikan struktur datanya
interface Skill {
    namaSkill: string | null;
    level: number | null;
    jumlahSubskill: number;
    jumlahSudahBaca: number;
}

interface TeamGroup {
    namaTeam: string;
    skill: Skill[];
}

export async function getStatBacaPerLevel({ idSubBidang }: getStatBacaPerLevelProp) {

    const stat_baca_dokumen = await db.select({
        idDokumen: tStatusBaca.idDokumen,
        // idPembaca: tStatusBaca.idPembaca,
        jumlahOrangBaca: sql<number>`cast(count(${tStatusBaca.idPembaca}) as int)`.as("jumlahOrangBaca"),
    })
        .from(tStatusBaca)
        .groupBy(tStatusBaca.idDokumen)
        // .where(eq(tStatusBaca.idDokumen, "26904562-0707-47b4-9023-b7ab0a9537a9"))
        .as("stat_baca_dokumen")

    const stat_subskill = await db.select({
        idSkill: mSubSkill.idSkill,
        level: mSubSkill.level,
        jumlahSubskillLevel: sql<number>`cast(count(${mSubSkill.idSubSkill}) as int)`.as("jumlahSubskillLevel"),
        jumlahSudahBaca: sql<number>`cast(coalesce(sum(${stat_baca_dokumen.jumlahOrangBaca}),0) as int)`.as("jumlahSudahBaca"),
    })
        .from(mSubSkill)
        .leftJoin(stat_baca_dokumen, eq(mSubSkill.idDokumen, stat_baca_dokumen.idDokumen))
        .groupBy(mSubSkill.idSkill, mSubSkill.level)
        .where(eq(mSubSkill.idSkill, "b9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1"))
    // .as("stat_baca")

    // const skill_stat = await db.select({
    //     ...getColumns(stat_baca),
    //     namaSkill: mSkill.namaSkill,
    //     totalSubskill: sql<number>`cast(coalesce(sum(${stat_baca.jumlahSubskill}),0) as int)`.as("totalSubskill"),
    // })
    //     .from(mSkill)
    //     .leftJoin(stat_baca, eq(mSkill.idSkill, stat_baca.idSkill))
    //     .groupBy(mSkill.namaSkill, stat_baca.idSkill, stat_baca.level)

    // const res = await db.select({
    //     namaTeam: mTeam.namaTeam,
    //     jumlahMemberTeam: sql<number>`cast(count(distinct ${mUserProfiles.idUser}) as int)`,
    //     namaSkill: mSkill.namaSkill,
    //     jumlahSubskill: sql<number>`cast(count(${mSubSkill.idSubSkill}) as int)`,
    //     level: mSubSkill.level,
    //     jumlahSubskillPerLevel: sql<number>`cast(count(distinct ${mSubSkill.idSubSkill}) as int)`,
    //     jumlahSudahBaca: sql<number>`cast(count(distinct ${tStatusBaca.idStatusBaca}) as int)`,
    // }).from(mSkill)
    //     .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
    //     .leftJoin(tStatusBaca, eq(mSubSkill.idDokumen, tStatusBaca.idDokumen))
    //     .leftJoin(mTeam, eq(mSkill.idTeam, mTeam.idTeam))
    //     .leftJoin(mTeamMember, eq(mTeam.idTeam, mTeamMember.idTeam))
    //     .leftJoin(mUserProfiles, eq(mTeamMember.idUser, mUserProfiles.idUser))
    //     .groupBy(mSkill.namaSkill, mSubSkill.level, mTeam.namaTeam, mSkill.namaSkill)
    //     .orderBy(desc(mSkill.namaSkill))
    //     .where(idSubBidang ? eq(mSkill.idSubBidang, idSubBidang) : undefined)

    // const mappingRes = R.pipe(
    //     res,
    //     R.groupBy(x => x.namaTeam ?? ""),
    //     R.entries(),
    //     R.map(([namaTeam, items]) => ({
    //         namaTeam,
    //         jumlahMemberTeam: items[0].jumlahMemberTeam,
    //         skill: items.map(item => ({
    //             namaSkill: item.namaSkill,
    //             totalSubskill: item.jumlahSubskill,
    //             level: item.level,
    //             jumlahSubskill: item.jumlahSubskill,
    //             jumlahSudahBaca: item.jumlahSudahBaca,
    //         })),
    //     }))
    // );

    return stat_subskill
}