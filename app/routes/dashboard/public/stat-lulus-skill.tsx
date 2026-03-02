import { StatLulusSkill } from "@/features/dashboard/public/components/StatLulusSkill";
import type { Route } from "./+types/stat-lulus-skill";
import { getJumlahLulusPerSkill } from "@/features/dashboard/public/repositories/getJumlahLulusPerSkill";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const jumlahLulusPerSkill = await getJumlahLulusPerSkill()

    return { jumlahLulusPerSkill }
}

export default function StatLulusSkillPage({ loaderData, params }: Route.ComponentProps) {

    const { jumlahLulusPerSkill } = loaderData

    return (
        <div>
            <StatLulusSkill teamStat={jumlahLulusPerSkill} />
        </div>
    )
}