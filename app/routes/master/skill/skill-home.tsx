import { HeaderRoute } from "@/components/header-route";
import { userContext } from "@/lib/context";
import type { Route } from "./+types/skill-home";
import { getTeamsAll } from "@/features/team/services/get-teams-all";
import { EmptyTeamInSkillMaster } from "@/features/skill/components/master-view/empty-team";
import { TeamCard } from "@/features/skill/components/master-view/team-card";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // context
    const user = context.get(userContext)

    // master data
    const teams = await getTeamsAll(user.idSubBidang!)

    return { teams }
}

export default function SkillMasterRoute({ loaderData, params }: Route.ComponentProps) {

    const { teams } = loaderData

    const title = "Skill"
    const description = "Pilih Team"

    return (
        <div>
            <HeaderRoute
                title={title}
                description={description} />
            {teams.length === 0 ? (
                <EmptyTeamInSkillMaster />
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {teams.map((team) => (
                        <TeamCard key={team.idTeam} namaTeam={team.namaTeam} idTeam={team.idTeam} />
                    ))}
                </div>
            )}
        </div>
    )
}