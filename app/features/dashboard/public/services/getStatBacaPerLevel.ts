import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, tStatusBaca } from "database/schema";
import { eq, sql } from "drizzle-orm";

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
    namaTeam: string | null;
    skill: Skill[];
}

export async function getStatBacaPerLevel({ idSubBidang }: getStatBacaPerLevelProp) {
    const res = await db.select({
        namaTeam: mTeam.namaTeam,
        namaSkill: mSkill.namaSkill,
        level: mSubSkill.level,
        jumlahSubskill: sql<number>`cast(count(${mSubSkill.idSubSkill}) as int)`,
        jumlahSudahBaca: sql<number>`cast(count(${tStatusBaca.idStatusBaca}) as int)`,
    }).from(mSkill)
        .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
        .leftJoin(tStatusBaca, eq(mSubSkill.idDokumen, tStatusBaca.idDokumen))
        .leftJoin(mTeam, eq(mSkill.idTeam, mTeam.idTeam))
        .groupBy(mSkill.namaSkill, mSubSkill.level, mTeam.namaTeam)
        .where(idSubBidang ? eq(mSkill.idSubBidang, idSubBidang) : undefined)

    // 2. Gunakan di dalam reduce
    const mappingRes = res.reduce((acc: TeamGroup[], item) => {
        let team = acc.find(t => t.namaTeam === item.namaTeam);

        const skillData: Skill = {
            namaSkill: item.namaSkill,
            level: item.level,
            jumlahSubskill: item.jumlahSubskill,
            jumlahSudahBaca: item.jumlahSudahBaca,
        };

        if (team) {
            team.skill.push(skillData);
        } else {
            acc.push({
                namaTeam: item.namaTeam,
                skill: [skillData]
            });
        }

        return acc;
    }, [] as TeamGroup[]);

    return mappingRes
}