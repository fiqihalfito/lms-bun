import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/skill-list-page";
import { Badge } from "@/components/ui/badge";
import { Outlet } from "react-router";
import { SkillList } from "@/features/skill/components/master-view/SkillList";
import { TeamService } from "@/features/team/services/TeamService";
import { SkillService } from "@/features/skill/services/SkillService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  // source
  const [team, skills] = await Promise.all([
    TeamService.getTeamById(params.idTeam),
    SkillService.getSkillsByIdTeam(params.idTeam),
  ]);

  return {
    nameTeam: team[0].namaTeam,
    skills,
  };
}

export default function SkillListPage({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { nameTeam, skills } = loaderData;

  const title = "Skill";
  const description = "List skill dan subskill";

  return (
    <div>
      <HeaderRoute title={title} description={description} />

      <div className="flex flex-row border divide-x-1 rounded-md">
        <div className="w-1/4 py-4">
          <Badge className="mx-4">{nameTeam}</Badge>
          <SkillList skills={skills} />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
