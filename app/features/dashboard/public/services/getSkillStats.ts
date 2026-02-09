import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, mUserProfiles, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, isNotNull, sql } from "drizzle-orm";

export async function getSkillStats() {
    // const res = await db.query.mTeam.findMany({
    //     with: {
    //         skill: {
    //             // with: {
    //             //     subSkill: {
    //             //         extras: {
    //             //             jumlahSelesaiBaca: (table) => db.$count(tStatusBaca, eq(tStatusBaca.idDokumen, table.idDokumen))
    //             //         },
    //             //     }
    //             // }
    //             extras: {
    //                 jumlahSelesaiBaca: (table) => db.$count(tStatusBaca, eq(tStatusBaca.idDokumen, table.idDokumen))
    //             }
    //         }
    //     },

    // })


    const res = await db
        .select({
            namaTeam: mTeam.namaTeam,
            namaSkill: mSkill.namaSkill,

            persentaseTelahBaca: sql<number>`
      CASE
        WHEN COUNT(DISTINCT ${mSubSkill.idDokumen}) = 0 THEN 0
        ELSE ROUND(
          COUNT(${tStatusBaca.idStatusBaca}) * 100.0
          /
          (
            COUNT(DISTINCT ${mUserProfiles.idUser})
            *
            COUNT(DISTINCT ${mSubSkill.idDokumen})
          ),
          2
        )
      END
    `.as("persentase_telah_baca"),
        })
        .from(mTeam)

        // team → skill
        .innerJoin(mSkill, eq(mSkill.idTeam, mTeam.idTeam))

        // skill → subskill
        .innerJoin(mSubSkill, eq(mSubSkill.idSkill, mSkill.idSkill))

        // semua user (WAJIB LEFT JOIN)
        .innerJoin(
            mUserProfiles,
            eq(mUserProfiles.idSubBidang, mTeam.idSubBidang)
        )

        // status baca (boleh kosong)
        .leftJoin(
            tStatusBaca,
            and(
                eq(tStatusBaca.idDokumen, mSubSkill.idDokumen),
                eq(tStatusBaca.idPembaca, mUserProfiles.idUser)
            )
        )

        // .where(sql`${mSubSkill.idDokumen} IS NOT NULL`)
        .where(eq(mTeam.idSubBidang, "s1"))

        .groupBy(
            mTeam.idTeam,
            mTeam.namaTeam,
            mSkill.idSkill,
            mSkill.namaSkill
        )

        .orderBy(mTeam.namaTeam, mSkill.namaSkill);


    const mapping = res.reduce<Record<string, Omit<typeof res[number], "namaTeam">[]>>(
        (acc, { namaTeam, ...skill }) => {
            (acc[namaTeam!] ??= []).push(skill);
            return acc;
        },
        {}
    );

    return Object.entries(mapping).map(([namaTeam, skills]) => ({
        namaTeam,
        skills,
    }));

}