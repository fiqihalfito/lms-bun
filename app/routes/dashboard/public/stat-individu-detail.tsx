import { IndikatorDetail } from "@/features/dashboard/public/components/IndikatorDetail";
import type { Route } from "./+types/stat-individu-detail";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { NavLink } from "react-router";
import { DashboardService } from "@/features/dashboard/public/services/DashboardService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const userSkillIndikator = await DashboardService.getUserSkillIndicator(
    params.idUser,
  );

  const achivedSkills = await DashboardService.getListIndividuSkillSingle(params.idUser)


  return {
    userSkillIndikator,
    achivedSkills
  };
}

export default function StatIndividuDetailPage({
  loaderData,
  params,
  matches
}: Route.ComponentProps) {
  const { userSkillIndikator, achivedSkills } = loaderData;

  return (
    <div>
      <div className="flex flex-col mb-8">
        <div className="mb-4">
          <Button variant={"link"} asChild className="px-0">
            <NavLink to={`..`}>
              <ArrowLeftIcon />
              Kembali
            </NavLink>
          </Button>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Statistik Individu</h1>
        </div>
      </div>
      <IndikatorDetail userIndicatorSkill={userSkillIndikator} achivedSkills={achivedSkills} />
    </div>
  );
}
