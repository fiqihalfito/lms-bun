import type { Route } from "./+types/skill-subskill-list-page";
import { SubskillService } from "@/features/subskill/services/SubskillService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const subskills = await SubskillService.getSubskillByIdSkill(params.idSkill);

  return {
    subskills,
  };
}

export default function SkillSubskillListPage({
  loaderData,
  params,
  matches,
}: Route.ComponentProps) {
  const { subskills } = loaderData;

  return (
    <div>
      <div>
        <h1></h1>
        <pre>{JSON.stringify(matches, null, 2)}</pre>
      </div>
      {subskills.map((ss, i) => (
        <div>{ss.namaSubSkill}</div>
      ))}
    </div>
  );
}
