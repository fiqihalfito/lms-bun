import { IndividualIndikatorService } from "@/features/dashboard/public/services/IndividualIndikatorService";
import type { Route } from "./+types/indikator-individu";
import { IndikatorIndividu } from "@/features/dashboard/public/components/IndikatorIndividu";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    const individuIndikator = await IndividualIndikatorService()
    return { individuIndikator }
}

export default function IndikatorIndividuPage({ loaderData, params }: Route.ComponentProps) {

    const { individuIndikator } = loaderData

    return (
        <div>
            <IndikatorIndividu baseIndividuIndikator={individuIndikator} />
        </div>
    )
}