import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Route } from "./+types/skill-subskill-list-page";
import { SubskillService } from "@/features/subskill/services/SubskillService";
import { useMemo } from "react";
import { ModalGantiPicSubskill } from "@/features/subskill/components/modal-ganti-pic-subskill";
import { UserPICSubskillService } from "@/features/user/services/UserPICSubskill";
import { userContext } from "@/lib/context";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext)
  const subskills = await SubskillService.getSubskillByIdSkill(params.idSkill);

  const picDropdown = await UserPICSubskillService.getPICSubskillDropdown(user?.idSubBidang!);

  const { toast, headers } = await getToast(request)

  return data({
    subskills,
    picDropdown,
    toast
  }, { headers });
}

export default function SkillSubskillListPage({
  loaderData,
  params,
  matches,
}: Route.ComponentProps) {
  const { subskills, picDropdown, toast } = loaderData;

  useToastEffect(toast)

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
              <div className="flex flex-col gap-3 mt-6">
                {(groupedByLevel[level] ?? []).map((ss) => (
                  <div key={ss.idSubSkill} className="flex items-center justify-between border p-4 rounded">
                    <div>
                      <h4 className="text-sm/tight">{ss.namaSubSkill}</h4>
                      <p className="text-xs text-muted-foreground">level {ss.level}</p>
                      <p className="text-xs text-muted-foreground mt-6">PIC: {ss.pic?.namaUser}</p>
                    </div>
                    <ModalGantiPicSubskill idSubSkill={ss.idSubSkill} picDropdown={picDropdown} defaultValue={{ idPic: ss.idPic ?? "" }} />
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
