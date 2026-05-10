import type { Route } from "./+types/picsubskill";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { picSubSkillColumns } from "@/features/subskill/lib/column-table/picsubskill-columns";
import { HeaderRoute } from "@/components/header-route";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { data, Link, useNavigate } from "react-router";
import { getToast } from "remix-toast";
import { useToastEffect } from "@/hooks/use-toast";
import { SummaryPicSubSkill } from "@/features/subskill/components/SummaryPicSubskill";
import { SubskillService } from "@/features/subskill/services/SubskillService";
import { SkillService } from "@/features/skill/services/SkillService";
import { UserProfileService } from "@/features/user/services/UserProfileService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const mappedsubSkills = await SubskillService.getSubSkillByIdPIC(
    user.idUser,
    params.idSkill,
  );

  const namaSkill = await SkillService.getNamaSkillByIdSkill(params.idSkill);
  const skillProgressDetail =
    await SkillService.getSkillProgressDetailByIdSkill(
      params.idSkill,
      user.idUser,
    );

  const namaTeam = await UserProfileService.getNamaTeamByIdUser(user.idUser);

  // toast
  const { headers, toast } = await getToast(request);

  return data(
    { mappedsubSkills, namaSkill, skillProgressDetail, namaTeam, toast },
    { headers },
  );
  // return { mappedsubSkills, namaSkill }
}

export default function PicSubSkillRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { mappedsubSkills, namaSkill, skillProgressDetail, namaTeam, toast } =
    loaderData;

  useToastEffect(toast);

  return (
    <div>
      <HeaderRoute
        title="PIC SubSkill"
        description={`Skill ${namaSkill}`}
        actionButton={
          <Button variant={"default"} asChild>
            <Link to="../../.." relative="path">
              <ChevronLeftIcon />
              Kembali
            </Link>
          </Button>
        }
      />
      <SummaryPicSubSkill
        skillProgressDetail={skillProgressDetail[0]}
        namaTeam={namaTeam}
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
  );
}
