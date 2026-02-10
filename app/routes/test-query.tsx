import type { Route } from "./+types/test-query";
import { getSkillAndStats } from "@/features/dashboard/private/services/getSkillAndStats";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    const res = await getSkillAndStats("s1", "aaaaaaaa-aaaa-4000-8000-000000000001", "c5c966fa-5081-462f-b0d5-493addfe7131")

    return { res }
}