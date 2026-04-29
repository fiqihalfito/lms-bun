import type { Route } from "./+types/stat-individu";
import { StatIndividu } from "@/features/dashboard/public/components/StatIndividu";
import { Suspense } from "react";
import { Await, Outlet } from "react-router";
import { LoadingContentDashboard } from "@/features/dashboard/public/components/loading-content-dashboard";
import { DashboardService } from "@/features/dashboard/public/services/DashboardService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const listIndividuSkill = await DashboardService.getListIndividuSkill();

  return { listIndividuSkill };
}

export default function StatIndividuPage({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { listIndividuSkill } = loaderData;

  if (params.idUser) {
    return <Outlet />;
  }

  return (
    <div>
      <Suspense fallback={<LoadingContentDashboard />}>
        <Await resolve={listIndividuSkill}>
          {(res) => <StatIndividu listIndividuSkillData={res} />}
        </Await>
      </Suspense>
    </div>
  );
}
