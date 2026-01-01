import { userContext } from "@/lib/context";
import { getLayananAll } from "@/features/layanan/services/getLayananAll";
import type { Route } from "./+types/get-layanan-all";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const layanan = await getLayananAll(user?.idSubBidang!)

    return { layanan }
}