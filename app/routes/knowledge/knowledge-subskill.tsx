import { getSubskillByIdSkillAndLevel } from "@/features/subskill/services/getSubskillByIdSkillAndLevel";
import type { Route } from "./+types/knowledge-subskill";
import { HeaderRoute } from "@/components/header-route";
import { useLocation } from "react-router";
import { BreadCrumb } from "@/components/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { userContext } from "@/lib/context";
import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from "react";
import { getSubskillStatPerLevel } from "@/features/subskill/services/getSubskillStatPerLevel";
import { SubskillStatPerLevel } from "@/features/subskill/components/SubskillStatPerLevel";
import { getNamaSkillByIdSkill } from "@/features/skill/services/getNamaSkillByIdSkill";
import BadgeSkillLevel from "@/features/skill/components/BadgeSkillLevel";
import { SubskillLevelList } from "@/features/subskill/components/SubskillLevelList";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const subskills = await getSubskillByIdSkillAndLevel(params.idSkill, Number(params.level), user.idUser)
    const subskillStatPerLevel = await getSubskillStatPerLevel(params.idSkill, Number(params.level), user.idUser)
    const namaSkill = await getNamaSkillByIdSkill(params.idSkill)

    return { subskills, subskillStatPerLevel, namaSkill }
}

// set current url here to localStorage to redirect back to this page after submit kuis


export default function KnowledgeSubskillRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskills, subskillStatPerLevel, namaSkill } = loaderData

    const breadcrumb = useBreadcrumbs([
        { label: "Kategori", to: `/app/dokumen` },
        { label: "Team", to: `/app/knowledge/team` },
        { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
        { label: "Level", to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level` },
        { label: "Subskill", to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level/${params.level}/subskill` },
    ])

    const location = useLocation()
    const [redirectBackAfterKuis, setRedirectBackAfterKuis, removeRedirectBackAfterKuis] = useLocalStorage('redirectBackAfterKuis', "/")
    useEffect(() => {
        setRedirectBackAfterKuis(location.pathname)
    }, [location])

    return (
        <div>
            <BreadCrumb routeBreadCrumb={breadcrumb} />
            <HeaderRoute title="Subskill" description="list subskill berisi dokumen dan kuis yang harus dilengkapi" />

            <SubskillStatPerLevel subskillStatPerLevel={subskillStatPerLevel} />

            <BadgeSkillLevel namaSkill={namaSkill} level={params.level} />


            <SubskillLevelList subskills={subskills} />
        </div>
    )
}