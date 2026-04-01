import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/skill-list-page";
import { getTeamById } from "@/features/team/services/getTeamById";
import invariant from "tiny-invariant";
import { Badge } from "@/components/ui/badge";
import { getSkillsByIdTeam } from "@/features/skill/services/master/getSkillsByIdTeam";
import { SkillListItem } from "@/features/skill/components/master-view/skill-list-item";
import { Outlet, redirect } from "react-router";
import { SkillList } from "@/features/skill/components/master-view/SkillList";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // source
    const team = await getTeamById(params.idTeam)
    invariant(team.length > 0, "Team not found")

    const skills = await getSkillsByIdTeam(params.idTeam)


    return {
        nameTeam: team[0].namaTeam,
        skills
    }
}


export default function SkillListPage({ loaderData, params }: Route.ComponentProps) {

    const { nameTeam, skills } = loaderData

    const title = "Skill"
    const description = "List skill dan subskill"

    return (
        <div>
            <HeaderRoute
                title={title}
                description={description}
            />

            <div className="flex flex-row border divide-x-2 rounded-md">
                <div className="w-1/4 py-4">
                    <Badge className="mx-4">{nameTeam}</Badge>
                    <SkillList skills={skills} />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}