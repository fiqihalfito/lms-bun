import { StatLulusSkill } from "@/features/dashboard/public/components/StatLulusSkill";
import type { Route } from "./+types/stat-lulus-skill";
import { Suspense } from "react";
import { Await } from "react-router";
import { LoadingContentDashboard } from "@/features/dashboard/public/components/loading-content-dashboard";
import { DashboardService } from "@/features/dashboard/public/services/DashboardService";
import { StatLulusSkillV2 } from "@/features/dashboard/public/components/StatLulusSkill-v2";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const jumlahLulusPerSkill = DashboardService.getJumlahLulusPerSkill()
    const jumlahLulusPerSkillV2 = DashboardService.getJumlahLulusPerSkillV2()

    return { jumlahLulusPerSkill, jumlahLulusPerSkillV2 }
}

export default function StatLulusSkillPage({ loaderData, params }: Route.ComponentProps) {

    const { jumlahLulusPerSkill, jumlahLulusPerSkillV2 } = loaderData

    return (
        <div>
            <Suspense fallback={<LoadingContentDashboard />}>
                <Await resolve={jumlahLulusPerSkillV2}>
                    {(res) => (
                        <StatLulusSkillV2 teamStat={res} />
                    )}
                </Await>
            </Suspense>
            {/* <Suspense fallback={<LoadingContentDashboard />}>
                <Await resolve={jumlahLulusPerSkill}>
                    {(res) => (
                        <StatLulusSkill teamStat={res} />
                    )}
                </Await>
            </Suspense> */}
        </div>
    )
}