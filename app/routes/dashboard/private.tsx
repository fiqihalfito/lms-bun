import { getToast } from "remix-toast";
import type { Route } from "./+types/private";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { HeaderRoute } from "@/components/header-route";
import { userContext } from "@/lib/context";
import { getIdTeamByIdUser } from "@/features/team/services/getIdTeamByIdUser";
import { getSkillAndStats } from "@/features/dashboard/private/services/getSkillAndStats";
import { ListSkillCollapsible } from "@/features/dashboard/private/components/ListSkillCollapsible";
import { SkillCard } from "@/features/dashboard/private/components/SkillCard";
import { getUserProfilesByIdUser } from "@/features/user/services/repo/getUserProfilesByIdUser";
import { UserProfile } from "@/features/dashboard/private/components/UserProfile";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const { toast, headers } = await getToast(request);
    const user = context.get(userContext)
    const currentTeam = await getIdTeamByIdUser(user.idUser)
    const skillStats = await getSkillAndStats(user.idSubBidang!, currentTeam, user.idUser)

    const userProfile = await getUserProfilesByIdUser(user.idUser)

    return data({ toast, skillStats, userProfile }, { headers })
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {

    const { toast, skillStats, userProfile } = loaderData

    useToastEffect(toast)

    return (
        <div>
            {/* <HeaderRoute title="Dashboard" description="Melihat status terkini progress dokumen" /> */}
            <UserProfile userProfile={userProfile[0]} />
            <div className="space-y-4">
                {skillStats.map((teamData, index) => (
                    <ListSkillCollapsible key={teamData.idTeam} namaTeam={teamData.namaTeam} isOpen={index === 0}>
                        {teamData.groupTeam.map((skillData) => (
                            <SkillCard key={skillData.idSkill} skillData={skillData} />
                        ))}
                    </ListSkillCollapsible>
                ))}
            </div>
        </div>
    )
}