import { getSubskillByIdSkillAndLevel } from "@/features/subskill/services/getSubskillByIdSkillAndLevel";
import type { Route } from "./+types/knowledge-subskill";
import { HeaderRoute } from "@/components/header-route";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const subskills = await getSubskillByIdSkillAndLevel(params.idSkill, Number(params.level))

    return { subskills }
}

export default function KnowledgeSubskillRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskills } = loaderData

    return (
        <div>
            <HeaderRoute title="Subskill" description="Subskill" />
            <ItemGroup className="gap-y-3">
                {subskills.map((subskill, i) => (
                    <Item variant="outline" asChild>
                        <Link to={`${subskill.idSubSkill}`}>
                            <ItemMedia variant="icon">
                                {i + 1}
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{subskill.namaSubSkill}</ItemTitle>
                            </ItemContent>
                        </Link>

                    </Item>
                ))}
            </ItemGroup>
        </div>
    )
}