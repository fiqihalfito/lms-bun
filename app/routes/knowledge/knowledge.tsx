import { getTeamsAll } from "@/features/team/services/get-teams-all";
import type { Route } from "./+types/knowledge";
import { userContext } from "@/lib/context";
import { HeaderRoute } from "@/components/header-route";
import { NavLink } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const teams = await getTeamsAll(user.idSubBidang!)
    return { teams }
}

export default function KnowledgeRoute({ loaderData, params }: Route.ComponentProps) {

    const { teams } = loaderData


    return (
        <div>
            <HeaderRoute title="Knowledge" description="Dokumen Pembelajaran dan Skill" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {teams.map((team) => (
                    <NavLink
                        key={team.idTeam}
                        to={`${team.idTeam}/skill`}
                        className={({ isActive }) =>
                            `p-6 rounded-xl border transition-all duration-200 hover:shadow-md flex flex-col gap-2 group ${isActive
                                ? "bg-primary/5 border-primary text-primary"
                                : "bg-card border-border hover:border-primary/50"
                            }`
                        }
                    >
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {team.namaTeam}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            Lihat dokumen dan skill untuk tim {team.namaTeam}
                        </p>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}