import { getSubSkillByIdPIC } from "@/features/subskill/services/getSubSkillByIdPIC";
import type { Route } from "./+types/picsubskill";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { picSubSkillColumns } from "@/features/subskill/lib/column-table/picsubskill-columns";
import { HeaderRoute } from "@/components/header-route";
import { getNamaSkillByIdSkill } from "@/features/skill/services/getNamaSkillByIdSkill";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const mappedsubSkills = await getSubSkillByIdPIC(user.idUser, params.idSkill)
    const namaSkill = await getNamaSkillByIdSkill(params.idSkill)

    return { mappedsubSkills, namaSkill }
}

export default function PicSubSkillRoute({ loaderData, params }: Route.ComponentProps) {

    const { mappedsubSkills, namaSkill } = loaderData
    const navigate = useNavigate();

    return (
        <div>
            <HeaderRoute title="PIC SubSkill" description={`Skill ${namaSkill}`}
                actionButton={
                    <Button variant={"default"} size={"lg"} onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                        Kembali
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