import { getSkillAll } from "@/features/skill/services/getSkillAll";
import type { Route } from "./+types/knowledge-skill";
import { HeaderRoute } from "@/components/header-route";
import { Link, NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const skills = await getSkillAll(params.idTeam)

    return { skills }
}

export default function KnowledgeSkillRoute({ loaderData, params, matches }: Route.ComponentProps) {

    const { skills } = loaderData

    return (
        <div>
            <HeaderRoute title="Skill" description="Skill" />
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