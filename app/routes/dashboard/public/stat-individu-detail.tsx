import type { Route } from "./+types/stat-individu-detail";

export async function loader({ request, params, context }: Route.LoaderArgs) {



    return {}
}

export default function StatIndividuDetailPage({ loaderData, params }: Route.ComponentProps) {



    return (
        <div>
            <p>ini adalah individu detail</p>
        </div>
    )
}