import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/team-home";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { getTeamsAll } from "@/features/team/services/get-teams-all";
import { EmptyTeam } from "@/features/team/components/master-view/empty-team";
import { TambahTeamButton } from "@/features/team/components/master-view/tambah-team-button";
import { TeamsColumns } from "@/features/team/lib/column-table/teams-columns";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // context
    const user = context.get(userContext)

    // master data
    const teams = await getTeamsAll(user.idSubBidang!)

    // toast
    const { headers, toast } = await getToast(request)

    return data({ teams, toast }, { headers })
}

export default function TeamMasterRoute({ loaderData, params }: Route.ComponentProps) {

    const { teams, toast } = loaderData

    useToastEffect(toast)

    const title = "Team"
    const description = "Data Team"

    return (
        <div>
            <HeaderRoute
                title={title}
                description={description}
                actionButton={
                    <TambahTeamButton />
                } />
            {teams.length === 0 ? (
                <EmptyTeam />
            ) : (
                <DataTable columns={TeamsColumns} data={teams} />
            )}
        </div>
    )
}