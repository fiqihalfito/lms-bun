import type { Route } from "./+types/get-team-all";
import { userContext } from "@/lib/context";
import { getTeamsAll } from "../services/get-teams-all";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const teams = await getTeamsAll(user.idSubBidang!)

    return { teams }
}