import { userContext } from "@/lib/context";
import type { Route } from "./+types/get-layanan-all";
import { LayananService } from "../services/LayananService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const layanan = await LayananService.getAllLayanan(user?.idSubBidang!);

  return { layanan };
}
