import { StatLulusSkill } from "@/features/dashboard/public/components/StatLulusSkill";
import type { Route } from "./+types/stat-lulus-skill";
import { Suspense } from "react";
import { Await } from "react-router";
import { LoadingContentDashboard } from "@/features/dashboard/public/components/loading-content-dashboard";
import { DashboardService } from "@/features/dashboard/public/services/DashboardService";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const jumlahLulusPerSkill = DashboardService.getJumlahLulusPerSkill()

    return { jumlahLulusPerSkill }
}

export default function StatLulusSkillPage({ loaderData, params }: Route.ComponentProps) {

    const { jumlahLulusPerSkill } = loaderData

    return (
        <div>
            <Suspense fallback={<LoadingContentDashboard />}>
                <Await resolve={jumlahLulusPerSkill}>
                    {(res) => (
                        <StatLulusSkill teamStat={res} />
                    )}
                </Await>
            </Suspense>
        </div>
    )
}