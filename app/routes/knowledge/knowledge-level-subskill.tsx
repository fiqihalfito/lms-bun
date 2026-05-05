import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/knowledge-level-subskill";
import { BreadCrumb } from "@/components/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { userContext } from "@/lib/context";
import { LevelListKnowledge } from "@/features/subskill/components/LevelListKnowledge";
import { SubskillService } from "@/features/subskill/services/SubskillService";
import { SkillService } from "@/features/skill/services/SkillService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const subskillLevel = await SubskillService.getLevelSubskillListDataByIdSkill(
    params.idSkill,
    user.idUser,
  );

  const namaSkill = await SkillService.getNamaSkillByIdSkill(params.idSkill);

  return { subskillLevel, namaSkill };
}

export default function KnowledgeLevelSubskillRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { subskillLevel, namaSkill } = loaderData;

  const breadcrumb = useBreadcrumbs([
    { label: "Kategori", to: `/app/dokumen` },
    { label: "Team", to: `/app/knowledge/team` },
    { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
    {
      label: "Level",
      to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level`,
    },
  ]);

  return (
    <div>
      <BreadCrumb routeBreadCrumb={breadcrumb} />
      <HeaderRoute title="Level Subskill" description={namaSkill} />
      <LevelListKnowledge subskillLevel={subskillLevel} />
    </div>
  );
}
