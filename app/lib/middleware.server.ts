import { destroySession, getIdUserFromSession } from "@/features/session/services/session.server";
import { getUserByIdUser } from "@/features/user/services/repo/getUserByIdUser";
import { redirectWithError, redirectWithToast } from "remix-toast";
import { userContext, type UserContextForAuthType } from "./context";
import { getUserProfilesByIdUser } from "@/features/user/services/repo/getUserProfilesByIdUser";
import { getRoleNameByIdRole } from "@/features/role/services/getRoleNameByIdRole";
import { getSubBidangNameByIdSubBidang } from "@/features/subbidang/services/getSubBidangNameByIdSubBidang";
import { getTeamDataFromTeamMember } from "@/features/team/services/getTeamDataFromTeamMember";

// Server-side Authentication Middleware
export async function authMiddleware({ request, context }: any) {
    const idUser = await getIdUserFromSession(request);
    if (!idUser) {
        throw await redirectWithToast("/auth/login", {
            message: "Silahkan login terlebih dahulu",
            type: "error",
        });
    }

    const user = await getUserByIdUser(idUser);
    // jika ada session id user tapi tidak ada di database
    if (user.length === 0) {
        // destroy session alias logout
        const headers = await destroySession(request)
        throw await redirectWithToast("/auth/login", {
            message: "Silahkan login ulang",
            type: "warning",
        }, { headers });
    }

    const userData = user[0]

    const userProfiles = await getUserProfilesByIdUser(idUser);
    // const roleName = await getRoleNameByIdRole(userData.idRole);
    // const subBidangName = await getSubBidangNameByIdSubBidang(userProfiles[0].idSubBidang);
    // const teamData = await getTeamDataFromTeamMember(idUser);

    context.set(userContext, {
        email: userData.email,
        idRole: userData.idRole,
        idUser: userData.idUser,
        namaUser: userProfiles[0].namaUser,
        idSubBidang: userProfiles[0].idSubBidang,
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
        })
    }
}