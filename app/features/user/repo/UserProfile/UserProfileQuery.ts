import { db } from "database/connect.server";
import type { UserProfileFilter } from "../../lib/types";

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
}
