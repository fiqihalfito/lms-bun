import { destroySession } from "@/features/session/services/session.server";
import type { Route } from "./+types/logout";
import { redirectWithToast } from "remix-toast";


export async function action({ request }: Route.ActionArgs) {

    const headers = await destroySession(request)

    return redirectWithToast("/auth/login", {
        message: "Anda berhasil logout",
        type: "success",
    }, { headers })
}