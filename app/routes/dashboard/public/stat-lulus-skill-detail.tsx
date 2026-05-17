import { SkillService } from "@/features/skill/services/SkillService";
import type { Route } from "./+types/stat-lulus-skill-detail";
import { DashboardService } from "@/features/dashboard/public/services/DashboardService";
import { ListUserLulusBySkill } from "@/features/dashboard/public/components/listUserLulusBySkill";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { ArrowLeft, ArrowLeftIcon } from "lucide-react";


export async function loader({ request, params, context }: Route.LoaderArgs) {

    const namaSkill = await SkillService.getNamaSkillByIdSkill(params.idSkill)
    const userLulusSkill = await DashboardService.getNamaUserLulusBySkill(params.idSkill)
    return { namaSkill, userLulusSkill }
}

export default function StatLulusSkillDetailPage({ loaderData, params }: Route.ComponentProps) {

    const { namaSkill, userLulusSkill } = loaderData

    return (
        <div>
            <div className="mb-4">
                <Button variant={"link"} asChild className="px-0">
                    <NavLink to={`..`}>
                        <ArrowLeftIcon />
                        Kembali
                    </NavLink>
                </Button>
            </div>
            <div>
                <h1 className="font-bold text-2xl">Detail Lulus Skill </h1>
                <p className="text-muted-foreground">{namaSkill}</p>

                <ListUserLulusBySkill data={userLulusSkill.levelGroup} />
            </div>

        </div>
    )
}