import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Route } from "./+types/skill-subskill-list-page";
import { SubskillService } from "@/features/subskill/services/SubskillService";
import { useMemo } from "react";

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
  const skillName = matches[3].loaderData.skills.find(skill => skill.idSkill === params.idSkill)?.namaSkill
  const levels = useMemo(() => {
    return [...new Set(subskills.map(ss => ss.level))]
      .sort((a, b) => a - b) // Urutkan secara angka (1, 2, 10...)
      .map(level => String(level)); // Baru ubah ke string
  }, [subskills]);

  const groupedByLevel = useMemo(() => {
    return subskills.reduce<Record<string, typeof subskills>>((acc, ss) => {
      const key = String(ss.level)
      if (!acc[key]) acc[key] = []
      acc[key].push(ss)
      return acc
    }, {})
  }, [subskills])

  return (
    <div>
      <div className="px-8 h-24 flex items-center border-b">
        <div className="flex flex-col mt-4">
          <h6 className="text-muted-foreground text-sm/4 font-medium">Skill</h6>
          <h1 className="text-lg font-semibold">{skillName}</h1>
        </div>
        {/* <pre>{JSON.stringify(levels, null, 2)}</pre> */}
      </div>
      <div className="px-8 py-8 ">

        <Tabs defaultValue={levels[0]} className="w-full">
          <TabsList>
            {levels.map((level) => (
              <TabsTrigger key={level} value={level} className="px-12">
                Level {level}
              </TabsTrigger>
            ))}
          </TabsList>
          {levels.map((level) => (
            <TabsContent key={level} value={level}>
              <div className="flex flex-col gap-1.5 mt-6">
                {(groupedByLevel[level] ?? []).map((ss) => (
                  <div key={ss.idSubSkill} className="border p-4 rounded">
                    <h4 className="text-sm/tight">{ss.namaSubSkill}</h4>
                    <p className="text-xs text-muted-foreground">level {ss.level}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

      </div>
    </div>
  );
}
