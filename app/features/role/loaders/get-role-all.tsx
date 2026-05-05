import { RoleService } from "../services/RoleService";
import type { Route } from "./+types/get-role-all";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const roles = await RoleService.getAllRole();

  return { roles };
}
