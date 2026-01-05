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

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const mappedsubSkills = await getSubSkillByIdPIC(user.idUser, params.idSkill)
    const namaSkill = await getNamaSkillByIdSkill(params.idSkill)

    // toast
    const { headers, toast } = await getToast(request)

    return data({ mappedsubSkills, namaSkill, toast }, { headers })
    // return { mappedsubSkills, namaSkill }
}

export default function PicSubSkillRoute({ loaderData, params }: Route.ComponentProps) {

    const { mappedsubSkills, namaSkill, toast } = loaderData
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