import { userContext } from "@/lib/context";
import type { Route } from "./+types/skill";
import { getSkillByIdPicSubSkill } from "@/features/subskill/services/getSkillByIdPicSubSkill";
import { HeaderRoute } from "@/components/header-route";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const skills = await getSkillByIdPicSubSkill(user.idUser)

    return { skills }
}


export default function SkillPicSubSkillRoute({ loaderData, params }: Route.ComponentProps) {

    const { skills } = loaderData

    return (
        <div>
            <HeaderRoute title="Skill" description="Skill perlu upload dokumen dan membuat kuis" />
            <ItemGroup className="gap-y-3">
                {skills.map((skill, i) => (
                    <Item variant="outline" asChild>
                        <Link to={`${skill?.idSkill}`}>
                            <ItemMedia variant="icon">
                                {i + 1}
                            </ItemMedia>
                            <ItemContent>
                                <ItemTitle>{skill?.namaSkill}</ItemTitle>
                            </ItemContent>
                        </Link>

                    </Item>
                ))}
            </ItemGroup>
        </div>
    )
}