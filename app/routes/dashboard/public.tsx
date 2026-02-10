import type { Route } from "./+types/public";
import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { StatsSkill } from "@/features/dashboard/public/components/stats-skill";
import { SubbidangFilter } from "@/features/dashboard/public/components/SubbidangFilter";
import { getSkillStats } from "@/features/dashboard/public/services/getSkillStats";
import { getAllSubbidang } from "@/features/subbidang/services/getAllSubbidang";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const statsSkill = await getSkillStats()
    const subbidang = await getAllSubbidang()

    return {
        statsSkill,
        subbidang
    }
}

export default function DashboardPublicRoute({ loaderData, params }: Route.ComponentProps) {

    const { statsSkill, subbidang } = loaderData

    return (
        <div className="flex-1 ">
            <HeaderDashboardPublic />
            {/* container */}
            <div id="container" className="flex-1 max-w-7xl mx-auto">
                <SubbidangFilter subbidang={subbidang} />
                <StatsSkill statsSkill={statsSkill} />
            </div>
        </div>
    )
}