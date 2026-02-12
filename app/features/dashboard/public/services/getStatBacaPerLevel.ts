import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, mTeamMember, mUserProfiles, tStatusBaca } from "database/schema";
import { desc, eq, sql } from "drizzle-orm";
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
    const res = await db.select({
        namaTeam: mTeam.namaTeam,
        jumlahMemberTeam: sql<number>`cast(count(distinct ${mUserProfiles.idUser}) as int)`,
        namaSkill: mSkill.namaSkill,
        jumlahSubskill: sql<number>`cast(count(${mSubSkill.idSubSkill}) as int)`,
        level: mSubSkill.level,
        jumlahSubskillPerLevel: sql<number>`cast(count(distinct ${mSubSkill.idSubSkill}) as int)`,
        jumlahSudahBaca: sql<number>`cast(count(distinct ${tStatusBaca.idStatusBaca}) as int)`,
    }).from(mSkill)
        .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
        .leftJoin(tStatusBaca, eq(mSubSkill.idDokumen, tStatusBaca.idDokumen))
        .leftJoin(mTeam, eq(mSkill.idTeam, mTeam.idTeam))
        .leftJoin(mTeamMember, eq(mTeam.idTeam, mTeamMember.idTeam))
        .leftJoin(mUserProfiles, eq(mTeamMember.idUser, mUserProfiles.idUser))
        .groupBy(mSkill.namaSkill, mSubSkill.level, mTeam.namaTeam, mSkill.namaSkill)
        .orderBy(desc(mSkill.namaSkill))
        .where(idSubBidang ? eq(mSkill.idSubBidang, idSubBidang) : undefined)

    const mappingRes = R.pipe(
        res,
        R.groupBy(x => x.namaTeam ?? ""),
        R.entries(),
        R.map(([namaTeam, items]) => ({
            namaTeam,
            jumlahMemberTeam: items[0].jumlahMemberTeam,
            skill: items.map(item => ({
                namaSkill: item.namaSkill,
                totalSubskill: item.jumlahSubskill,
                level: item.level,
                jumlahSubskill: item.jumlahSubskill,
                jumlahSudahBaca: item.jumlahSudahBaca,
            })),
        }))
    );

    return mappingRes
}