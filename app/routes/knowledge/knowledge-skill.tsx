import type { Route } from "./+types/knowledge-skill";
import { HeaderRoute } from "@/components/header-route";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { BreadCrumb } from "@/components/breadcrumb";
import { getTeamById } from "@/features/team/services/getTeamById";
import { getSkillAndStats } from "@/features/skill/services/getSkillAndStats";
import { userContext } from "@/lib/context";
import { SkillCard } from "@/features/skill/components/skill-card";



// --- Loader ---
export async function loader({ request, params, context }: Route.LoaderArgs) {
    const user = context.get(userContext)
    const skills = await getSkillAndStats(user.idUser, params.idTeam)
    const team = await getTeamById(params.idTeam)

    return { skills, team }
}

// --- Component Utama ---
export default function KnowledgeSkillRoute({ loaderData, params }: Route.ComponentProps) {
    const { skills, team } = loaderData
    const skillList = skills

    const breadcrumb = useBreadcrumbs([
        { label: "Kategori", to: `/app/dokumen` },
        { label: "Team", to: `/app/knowledge/team` },
        { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
    ])

    return (
        <div className="space-y-6">
            <BreadCrumb routeBreadCrumb={breadcrumb} />
            <HeaderRoute title="Skill" description={`Daftar skill ${team[0]?.namaTeam || 'Team'}`} />

            {/* ======= UI IMPLEMENTATION START ========= */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                {skillList.map((skill) => (
                    <SkillCard key={skill.idSkill} skill={skill} idTeam={params.idTeam} />
                ))}
            </div>
            {/* ======= UI IMPLEMENTATION END ========= */}
        </div>
    )
}