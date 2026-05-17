import type { Route } from "./+types/stat-individu";
import { Suspense } from "react";
import { Await, Outlet } from "react-router";
import { LoadingContentDashboard } from "@/features/dashboard/public/components/loading-content-dashboard";
import { DashboardService } from "@/features/dashboard/public/services/DashboardService";
import { StatIndividuV2 } from "@/features/dashboard/public/components/StatIndividu-v2";
import { FilterStatIndividu } from "@/features/dashboard/public/components/FilterStatIndividu";
import { SkillService } from "@/features/skill/services/SkillService";


export async function loader({ request, params, context }: Route.LoaderArgs) {

  let url = new URL(request.url);
  let skill = url.searchParams.get("skill");

  const listIndividuSkill = DashboardService.getListIndividuSkill_V2("s1", { skill });

  // filter data
  const skillDropdown = await SkillService.getSkillDropdown();

  return { listIndividuSkill, skillDropdown };
}

export default function StatIndividuPage({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { listIndividuSkill, skillDropdown } = loaderData;

  if (params.idUser) {
    return <Outlet />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Statistik Individu</h1>
      </div>
      <FilterStatIndividu skillDropdown={skillDropdown} />
      <Suspense fallback={<LoadingContentDashboard />}>
        <Await resolve={listIndividuSkill}>
          {(res) => <StatIndividuV2 listIndividuSkillData={res} />}
        </Await>
      </Suspense>
    </div>
  );
}
