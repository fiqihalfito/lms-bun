import { getSkillAll } from "@/features/skill/services/getSkillAll";
import type { Route } from "./+types/knowledge-skill";
import { HeaderRoute } from "@/components/header-route";
import { Link } from "react-router";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { BreadCrumb } from "@/components/breadcrumb";
import { getTeamById } from "@/features/team/services/getTeamById";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const skills = await getSkillAll(params.idTeam)
    const team = await getTeamById(params.idTeam)

    return { skills, team }
}

export default function KnowledgeSkillRoute({ loaderData, params, matches }: Route.ComponentProps) {

    const { skills, team } = loaderData

    const breadcrumb = useBreadcrumbs([
        { label: "Kategori", to: `/app/dokumen` },
        { label: "Team", to: `/app/knowledge/team` },
        { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
    ])

    return (
        <div>
            <BreadCrumb routeBreadCrumb={breadcrumb} />
            <HeaderRoute title="Skill" description={`Daftar skill ${team[0].namaTeam}`} />
            <ItemGroup className="gap-y-3">
                {skills.map((skill, i) => (
                    <Item variant="outline" asChild>
                        <Link to={`${skill.idSkill}/level`}>
                            <ItemMedia variant="icon">
                                {i + 1}
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{skill.namaSkill}</ItemTitle>
                            </ItemContent>
                        </Link>

                    </Item>
                ))}
            </ItemGroup>

        </div>
    )
}