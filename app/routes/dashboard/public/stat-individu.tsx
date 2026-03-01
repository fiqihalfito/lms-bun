import { getStatIndividu } from "@/features/dashboard/public/repositories/getStatIndividu";
import type { Route } from "./+types/stat-individu";
import { StatIndividu } from "@/features/dashboard/public/components/StatIndividu";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const statIndividu = await getStatIndividu()

    return { statIndividu }
}

export default function StatIndividuPage({ loaderData, params }: Route.ComponentProps) {
    const { statIndividu } = loaderData


    return (
        <div>
            <StatIndividu statIndividuData={statIndividu} />
        </div>
    )
}