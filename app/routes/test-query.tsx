import type { Route } from "./+types/test-query";
import { getStatBacaPerLevel } from "@/features/dashboard/public/services/getStatBacaPerLevel";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    const res = await getStatBacaPerLevel({ idSubBidang: "s1" })

    return { res }
}