import { authMiddleware } from "@/lib/middleware.server";
import type { Route } from "./+types/app";

export const middleware: Route.MiddlewareFunction[] = [
    authMiddleware
]

export async function loader({ request, params }: Route.LoaderArgs) {



    return {}
}