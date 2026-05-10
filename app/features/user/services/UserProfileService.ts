import invariant from "tiny-invariant";
import { UserProfileQuery } from "../repo/UserProfile/UserProfileQuery";
import type { UserProfileFilter } from "../lib/types";
import type { mUserProfiles } from "database/schema";
import { UserProfileMutation } from "../repo/UserProfile/UserProfileMutation";
import { userSchema } from "../schema/user-schema";
import { parseWithZod } from "@conform-to/zod/v4";
import { UserAccountMutation } from "../repo/UserAccount/UserAccountMutation";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
import { TeamMutation } from "@/features/team/repo/TeamMutation";

export abstract class UserProfileService {
  static async getUserProfileWithTeam(idUser: string) {
    const data = await UserProfileQuery.findUserProfileWithTeam(idUser);
    return data;
  }

  static async getNamaTeamByIdUser(idUser: string) {
    const data = await UserProfileQuery.findUserProfileWithTeam(idUser);
    return data?.team?.namaTeam;
  }

  static async getAllUserWithFilter(
    idSubBidang: string,
    filter: UserProfileFilter,
  ) {
    const data = await UserProfileQuery.findUserProfile(idSubBidang, filter);
    return data;
  }

  static async getUserDataByIdUser(idUser: string) {
    const data = await UserProfileQuery.findUserDataByIdUser(idUser);
    return data;
  }

  static async getUserProfileByIdUser(idUser: string) {
    const data = await UserProfileQuery.findUserProfileByIdUser(idUser);
    invariant(data.length > 0, `Tidak ada user dengan id ${idUser}`);
    return data[0];
  }

  static async saveUserProfile(userProfile: typeof mUserProfiles.$inferInsert) {
    await UserProfileMutation.insertUserProfile(userProfile);
  }

  static async saveUserMaster(formData: FormData) {
    try {
      const submission = parseWithZod(formData, { schema: userSchema });

      if (submission.status !== "success") {
        return {
          success: false,
          message: "Data yang disubmit error",
          payload: submission.reply(),
        };
      }

      const idUser = formData.get("idUser");
      const newPassword = submission.value.newpassword
        ? await Bun.password.hash(submission.value.newpassword)
        : await Bun.password.hash("1234");

      if (!idUser) {
        // user account
        const newIdUser = await UserAccountMutation.insertUserAccount({
          email: submission.value.email,
          password: newPassword,
          idRole: submission.value.idRole,
        });
        // user profile
        await UserProfileMutation.insertUserProfile({
          namaUser: submission.value.namaUser,
          idUser: newIdUser[0].idUser,
          idSubBidang: "s1",
        });

        return {
          success: true,
          message: `User ${submission.value.namaUser} berhasil disimpan`,
        };
      } else {
        // user account
        await UserAccountMutation.updateUserAccount(idUser as string, {
          email: submission.value.email,
          password: newPassword,
          idRole: submission.value.idRole,
        });
        // user profile
        await UserProfileMutation.updateUserProfile(idUser as string, {
          namaUser: submission.value.namaUser,
          idUser: idUser as string,
        });
        await TeamMutation.updateTeamMember(idUser as string, {
          idTeam: submission.value.idTeam,
        });
        return {
          success: true,
          message: `User ${submission.value.namaUser} berhasil diupdate`,
        };
      }
    } catch (error) {
      const { message, constraint } = getDbErrorMessage(error);
      return { success: false, message: message, payload: null };
      // return dataWithError(null, message);
    }
  }
}
