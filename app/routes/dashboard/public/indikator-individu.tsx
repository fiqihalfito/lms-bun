import { IndividualIndikatorService } from "@/features/dashboard/public/services/IndividualIndikatorService";
import type { Route } from "./+types/indikator-individu";
import { IndikatorIndividu } from "@/features/dashboard/public/components/IndikatorIndividu";
import { Suspense } from "react";
import { Await } from "react-router";
import { LoadingContentDashboard } from "@/features/dashboard/public/components/loading-content-dashboard";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getTeamsAll } from "@/features/team/services/get-teams-all";
import { TeamFilter } from "@/features/dashboard/public/components/TeamFilter";
import { createLoader, parseAsString } from "nuqs/server";

export const indikatorIndividuSearchParams = {
    team: parseAsString.withDefault("")
}

export const loadSearchParams = createLoader(indikatorIndividuSearchParams)

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const { team } = loadSearchParams(request)

    const individuIndikator = IndividualIndikatorService({ idTeam: team })
    const allTeams = await getTeamsAll("s1")
    return { individuIndikator, allTeams, team }
}

export default function IndikatorIndividuPage({ loaderData, params }: Route.ComponentProps) {

    const { individuIndikator, allTeams, team } = loaderData


    return (
        <div>
            <h1 className="text-2xl font-bold mb-12">Indikator Individu</h1>
            <TeamFilter teams={allTeams} />
            <Suspense key={team} fallback={<LoadingContentDashboard />}>
                <Await resolve={individuIndikator}>
                    {(res) => (
                        <TooltipProvider delayDuration={0} skipDelayDuration={0}>
                            <IndikatorIndividu baseIndividuIndikator={res} />
                        </TooltipProvider>
                    )}
                </Await>
            </Suspense>
        </div>
    )
}