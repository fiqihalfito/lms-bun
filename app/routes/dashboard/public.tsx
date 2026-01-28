import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/public";
import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { StatsSkill } from "@/features/dashboard/public/components/stats-skill";
import { getSkillStats } from "@/features/dashboard/public/services/getSkillStats";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const statsSkill = await getSkillStats()

    return {
        statsSkill
    }
}

export default function DashboardPublicRoute({ loaderData, params }: Route.ComponentProps) {

    const { statsSkill } = loaderData

    return (
        <div className="flex-1 ">
            <HeaderDashboardPublic />
            <div className="flex-1 max-w-7xl mx-auto">
                <StatsSkill statsSkill={statsSkill} />
            </div>
        </div>
    )
}