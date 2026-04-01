import invariant from "tiny-invariant";
import type { Route } from "./+types/skill-subskill-list-page";
import { getSubskillByIdSkill } from "@/features/subskill/services/master/getSubskillByIdSkill";

export async function loader({ request, params, context }: Route.LoaderArgs) {


    const subskills = await getSubskillByIdSkill(params.idSkill)
    invariant(subskills.length > 0, "Subskills not found")

    return {
        subskills
    }
}

export default function SkillSubskillListPage({ loaderData, params, matches }: Route.ComponentProps) {

    const { subskills } = loaderData

    return (
        <div>
            <div>
                <h1></h1>
                <pre>{JSON.stringify(matches, null, 2)}</pre>
            </div>
            {subskills.map((ss, i) => (
                <div>{ss.namaSubSkill}</div>
            ))}
        </div>
    )
}