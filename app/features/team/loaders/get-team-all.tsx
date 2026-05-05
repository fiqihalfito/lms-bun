import type { Route } from "./+types/get-team-all";
import { userContext } from "@/lib/context";
import { TeamService } from "../services/TeamService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const teams = await TeamService.getTeamsAll(user.idSubBidang!);

  return { teams };
}
