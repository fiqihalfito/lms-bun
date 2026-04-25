import { getStatIndividu } from "@/features/dashboard/public/repositories/getStatIndividu";
import type { Route } from "./+types/stat-individu";
import { StatIndividu } from "@/features/dashboard/public/components/StatIndividu";
import { Suspense } from "react";
import { Await, Outlet } from "react-router";
import { LoadingContentDashboard } from "@/features/dashboard/public/components/loading-content-dashboard";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const statIndividu = getStatIndividu()

    return { statIndividu }
}

export default function StatIndividuPage({ loaderData, params }: Route.ComponentProps) {
    const { statIndividu } = loaderData

    if (params.idUser) {
        return <Outlet />
    }

    return (
        <div>
            <Suspense fallback={<LoadingContentDashboard />}>
                <Await resolve={statIndividu}>
                    {(res) => (
                        <StatIndividu statIndividuData={res} />
                    )}
                </Await>
            </Suspense>
        </div>
    )
}