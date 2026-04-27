import { IndikatorDetail } from "@/features/dashboard/public/components/IndikatorDetail";
import type { Route } from "./+types/stat-individu-detail";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { NavLink } from "react-router";
import { getUserSkillIndicator } from "@/features/user/services/repo/getUserSkillIndicator";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const userSkillIndikator = await getUserSkillIndicator(params.idUser!)

    return {
        userSkillIndikator
    }
}

export default function StatIndividuDetailPage({ loaderData, params }: Route.ComponentProps) {

    const { userSkillIndikator } = loaderData

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Statistik Individu</h1>
                    <p className="text-lg text-muted-foreground">{userSkillIndikator?.namaUser}</p>
                </div>
                <Button className="cursor-pointer" asChild>
                    <NavLink to="/dashboard/stat-individu">
                        <ArrowLeftIcon className="size-4" />
                        Kembali
                    </NavLink>
                </Button>
            </div>
            <IndikatorDetail user={userSkillIndikator} />
        </div>
    )
}