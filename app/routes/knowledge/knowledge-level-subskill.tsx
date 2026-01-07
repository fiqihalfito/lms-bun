import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/knowledge-level-subskill";
import { getSubskillLevelByIdSkill } from "@/features/subskill/services/getSubskillLevelByIdSkill";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import { BreadCrumb } from "@/components/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const subskillLevel = await getSubskillLevelByIdSkill(params.idSkill)

    return { subskillLevel }
}

export default function KnowledgeLevelSubskillRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskillLevel } = loaderData

    const breadcrumb = useBreadcrumbs([
        { label: "Kategori", to: `/app/dokumen` },
        { label: "Team", to: `/app/knowledge/team` },
        { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
        { label: "Level", to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level` },
    ])

    return (
        <div>
            <BreadCrumb routeBreadCrumb={breadcrumb} />
            <HeaderRoute title="Level Subskill" description="tingkatan pembelajaran tiap subskill" />
            <ItemGroup className="gap-y-3">
                {subskillLevel.map((item, i) => (
                    <Item key={i} variant="outline" asChild>
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