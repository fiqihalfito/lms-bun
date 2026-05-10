import { RoleQuery } from "@/features/role/repo/RoleQuery";
import { authenticator } from "./auth.server";
import { saveSession } from "@/features/session/services/session.server";
import { RoleService } from "@/features/role/services/RoleService";

export abstract class AuthService {
    static async login(request: Request) {
        // verify credentials
        let idUser = await authenticator.authenticate("form", request);
        // save session
        const headers = await saveSession(request, idUser);

        const loginPath = await RoleService.getLoginPathByIdUser(idUser);

        return { idUser, headers, loginPath }
    }
}