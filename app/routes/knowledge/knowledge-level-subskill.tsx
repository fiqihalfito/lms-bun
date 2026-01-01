import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/knowledge-level-subskill";
import { getSubskillLevelByIdSkill } from "@/features/subskill/services/getSubskillLevelByIdSkill";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const subskillLevel = await getSubskillLevelByIdSkill(params.idSkill)

    return { subskillLevel }
}

export default function KnowledgeLevelSubskillRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskillLevel } = loaderData

    return (
        <div>
            <HeaderRoute title="Skill" description="Skill" />
            <ItemGroup className="gap-y-3">
                {subskillLevel.map((item, i) => (
                    <Item variant="outline" asChild>
                        <Link to={`${item.level}/subskill`}>
                            {/* <ItemMedia variant="icon">
                                {i + 1}
                            </ItemMedia> */}
                            <ItemContent>
                                <ItemTitle>Level {item.level}</ItemTitle>
                                <ItemDescription>Jumlah Subskill: {item.jumlah}</ItemDescription>
                            </ItemContent>
                        </Link>

                    </Item>
                ))}
            </ItemGroup>
        </div>
    )
}