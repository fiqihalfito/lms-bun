import {
  destroySession,
  getIdUserFromSession,
} from "@/features/session/services/session.server";
import { redirectWithToast } from "remix-toast";
import { userContext, type UserContextForAuthType } from "./context";
import { UserAccountService } from "@/features/user/services/UserAccountService";
import { UserProfileService } from "@/features/user/services/UserProfileService";

// Server-side Authentication Middleware
export async function authMiddleware({ request, context }: any) {
  const idUser = await getIdUserFromSession(request);
  if (!idUser) {
    throw await redirectWithToast("/auth/login", {
      message: "Silahkan login terlebih dahulu",
      type: "error",
    });
  }

  const user = await UserAccountService.getUserAccountByIdUser(idUser);
  // jika ada session id user tapi tidak ada di database
  if (user.length === 0) {
    // destroy session alias logout
    const headers = await destroySession(request);
    throw await redirectWithToast(
      "/auth/login",
      {
        message: "Silahkan login ulang",
        type: "warning",
      },
      { headers },
    );
  }

  const userData = user[0];

  const userProfiles = await UserProfileService.getUserProfileByIdUser(idUser);
  // const roleName = await getRoleNameByIdRole(userData.idRole);
  // const subBidangName = await getSubBidangNameByIdSubBidang(userProfiles[0].idSubBidang);
  // const teamData = await getTeamDataFromTeamMember(idUser);

  context.set(userContext, {
    email: userData.email,
    idRole: userData.idRole,
    idUser: userData.idUser,
    namaUser: userProfiles.namaUser,
    idSubBidang: userProfiles.idSubBidang,
    // namaRole: roleName,
    // namaSubBidang: subBidangName,
    // idSubBidang: userProfiles[0].idSubBidang,
    // teamData: teamData[0].team,
  } satisfies UserContextForAuthType);
}

export async function loginMiddleware({ request, context }: any) {
  const idUser = await getIdUserFromSession(request);
  if (idUser) {
    throw await redirectWithToast("/app/dashboard", {
      message: "Anda masih login, Silahkan logout terlebih dahulu",
      type: "error",
    });
  }
}
