import { db } from "database/connect.server";
import type { UserProfileFilter } from "../../lib/types";
import { mSubSkill, mUserPICSubskill } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class UserProfileQuery {
  static async findUserProfileWithTeam(idUser: string) {
    const res = await db.query.mUserProfiles.findFirst({
      with: {
        team: true,
      },
      where: {
        idUser: idUser,
      },
    });
    return res;
  }

  static async findUserProfile(
    idSubBidang: string,
    { team }: UserProfileFilter,
  ) {
    // conditional first
    const filterTeam = team.length > 0 ? team : undefined;

    const res = await db.query.mUserProfiles.findMany({
      with: {
        userAccount: {
          columns: {
            password: false,
          },
        },
        team: true,
      },
      where: {
        idSubBidang: idSubBidang,
        team: {
          idTeam: {
            in: filterTeam,
          },
        },
      },
      orderBy: {
        namaUser: "asc",
      },
    });

    return res;
  }

  static async findUserDataByIdUser(idUser: string) {
    const res = await db.query.mUserProfiles.findFirst({
      where: {
        idUser: idUser,
      },
      with: {
        userAccount: {
          columns: {
            password: false,
          },
        },
        team: true,
      },
    });

    return res;
  }

  static async findUserProfileByIdUser(idUser: string) {
    // return await db.select().from(mUserProfiles).where(eq(mUserProfiles.idUser, idUser));
    const res = await db.query.mUserProfiles.findMany({
      where: {
        idUser: idUser,
      },
      with: {
        team: true,
        subBidang: true,
      },
    });
    return res;
  }

  static async findIdPic(idPic: string) {
    const res = await db.query.mUserPICSubskill.findFirst({
      where: {
        idPic: idPic,
      },
    });
    return res;
  }

  static async findAllPic(idSubBidang: string) {
    const res = await db.query.mUserProfiles.findMany({
      where: {
        picSubskill: true,
        idSubBidang: idSubBidang
      },
      orderBy: {
        namaUser: "asc"
      }
    })
    return res
  }

  static async findAllPicWithCountSubskill(idSubBidang: string) {
    const res = await db.query.mUserProfiles.findMany({
      where: {
        picSubskill: true,
        idSubBidang: idSubBidang
      },
      orderBy: {
        namaUser: "asc"
      },
      extras: {
        jumlahSubskill: (table) => db.$count(mSubSkill, eq(mSubSkill.idPic, table.idUser))
      }
    })
    return res
  }

  static async deletePICSubskill(idUser: string) {
    await db.delete(mUserPICSubskill).where(eq(mUserPICSubskill.idPic, idUser));

  }

  static async insertPICSubskill(idUser: string) {
    await db.insert(mUserPICSubskill).values({
      idPic: idUser,
    });
  }
}
