import { getSubSkillByIdPIC } from "@/features/subskill/services/getSubSkillByIdPIC";
import type { Route } from "./+types/picsubskill";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { picSubSkillColumns } from "@/features/subskill/lib/column-table/picsubskill-columns";
import { HeaderRoute } from "@/components/header-route";
import { getNamaSkillByIdSkill } from "@/features/skill/services/getNamaSkillByIdSkill";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { data, Link, useNavigate } from "react-router";
import { getToast } from "remix-toast";
import { useToastEffect } from "@/hooks/use-toast";
import { getSkillProgressDetailByIdSkill } from "@/features/subskill/services/getSkillProgressDetailByIdSkill";
import { SummaryPicSubSkill } from "@/features/subskill/components/SummaryPicSubskill";
import { getTeamDataFromTeamMember } from "@/features/team/services/getTeamDataFromTeamMember";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const mappedsubSkills = await getSubSkillByIdPIC(user.idUser, params.idSkill)
    const namaSkill = await getNamaSkillByIdSkill(params.idSkill)
    const skillProgressDetail = await getSkillProgressDetailByIdSkill(params.idSkill, user.idUser)

    const teamData = await getTeamDataFromTeamMember(user.idUser)
    const namaTeam = teamData[0].team[0].namaTeam

    // toast
    const { headers, toast } = await getToast(request)

    return data({ mappedsubSkills, namaSkill, skillProgressDetail, namaTeam, toast }, { headers })
    // return { mappedsubSkills, namaSkill }
}

export default function PicSubSkillRoute({ loaderData, params }: Route.ComponentProps) {

    const { mappedsubSkills, namaSkill, skillProgressDetail, namaTeam, toast } = loaderData
    const navigate = useNavigate();

    useToastEffect(toast)

    return (
        <div>
            <HeaderRoute title="PIC SubSkill" description={`Skill ${namaSkill}`}
                actionButton={
                    <Button variant={"default"} asChild>
                        <Link to="../../.." relative="path">
                            <ChevronLeftIcon />
                            Kembali
                        </Link>
                    </Button>
                }
            />
            <SummaryPicSubSkill skillProgressDetail={skillProgressDetail[0]} namaTeam={namaTeam!} />
            <div className="flex flex-col gap-8">
                {mappedsubSkills.map(({ level, subskills }, i) => (
                    <div key={i} className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">Level {level}</h2>
                        <DataTable columns={picSubSkillColumns} data={subskills} />
                    </div>
                ))}
            </div>
        </div>
    )
}