import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/team-edit";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import invariant from "tiny-invariant";
import { getTeamById } from "@/features/team/services/getTeamById";
import { FormTeam } from "@/features/team/components/master-view/form-team";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const team = await getTeamById(params.idTeam)
    invariant(team.length > 0, "Team tidak ditemukan")

    return { team: team[0] }
}

export default function TeamEditRoute({ loaderData, params }: Route.ComponentProps) {

    const { team } = loaderData
    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title="Edit Team" description="Edit Data Team"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(`/app/master/team`, {
                        viewTransition: true
                    })}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormTeam dv={team} />
        </div>
    )
}