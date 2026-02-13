import { getJumlahLulusPerSkill } from "@/features/dashboard/public/services/getJumlahLulusPerSkill";
import type { Route } from "./+types/test-query";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    const res = await getJumlahLulusPerSkill({ idSubBidang: "s1" })

    return { res }
}