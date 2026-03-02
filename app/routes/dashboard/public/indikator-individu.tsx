import { IndividualIndikatorService } from "@/features/dashboard/public/services/IndividualIndikatorService";
import type { Route } from "./+types/indikator-individu";
import { IndikatorIndividu } from "@/features/dashboard/public/components/IndikatorIndividu";
import { Suspense } from "react";
import { Await } from "react-router";
import { LoadingContentDashboard } from "@/features/dashboard/public/components/loading-content-dashboard";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    const individuIndikator = IndividualIndikatorService()
    return { individuIndikator }
}

export default function IndikatorIndividuPage({ loaderData, params }: Route.ComponentProps) {

    const { individuIndikator } = loaderData

    return (
        <div>
            <Suspense fallback={<LoadingContentDashboard />}>
                <Await resolve={individuIndikator}>
                    {(res) => (
                        <IndikatorIndividu baseIndividuIndikator={res} />
                    )}
                </Await>
            </Suspense>

        </div>
    )
}