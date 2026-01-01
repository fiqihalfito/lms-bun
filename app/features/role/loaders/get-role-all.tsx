import { getRoleAll } from "../services/getRoleAll";
import type { Route } from "./+types/get-role-all";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const roles = await getRoleAll()

    return { roles }
}