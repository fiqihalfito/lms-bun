import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { IndividualIndikatorService } from "../services/IndividualIndikatorService"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

type IndikatorIndividuProp = {
    baseIndividuIndikator: Awaited<ReturnType<typeof IndividualIndikatorService>>
}

export function IndikatorIndividu({ baseIndividuIndikator }: IndikatorIndividuProp) {
    return (
        <div className="mb-20">
            <h1 className="text-2xl font-bold mb-12">Indikator Individu</h1>

            <Tabs defaultValue={baseIndividuIndikator[0].namaTeam} className="">
                <TabsList variant={"line"} className="w-96 mb-6">
                    {baseIndividuIndikator.map((team, i) => (
                        <TabsTrigger key={team.namaTeam} value={team.namaTeam}>{team.namaTeam}</TabsTrigger>
                    ))}
                </TabsList>
                {baseIndividuIndikator.map((team, i) => (
                    <TabsContent key={team.namaTeam} value={team.namaTeam}>
                        {/* <ScrollArea className="border"> */}
                        <div className="flex flex-col gap-y-8">
                            {team.users.map((user, i) => (
                                <div key={user.namaUser} className="border rounded px-4 pb-4 shadow">
                                    <div className="mt-6">
                                        <h3 className="text-base font-semibold tracking-tight whitespace-nowrap px-4">{user.namaUser}</h3>
                                    </div>
                                    <Separator className="mt-4 mb-6" />
                                    <div className="flex flex-col gap-y-2">
                                        {user.skills.map((skill, i) => (
                                            <div key={`${user.namaUser}-${skill.namaSkill}`} className="flex items-center border rounded px-4 py-2 shadow">
                                                <div className="w-60">
                                                    <h2 className="text-sm font-light tracking-wide">{skill.namaSkill}</h2>
                                                </div>
                                                {/* <Separator orientation="vertical" /> */}
                                                <div className="flex gap-x-8">
                                                    {skill.level.map((levelItem, i) => (
                                                        <div key={`${user.namaUser}-${skill.namaSkill}-${levelItem.level}`} className="flex flex-col gap-y-1">
                                                            <p className="text-xs">Level {levelItem.level}</p>
                                                            <div className="flex gap-x-1.5">
                                                                {levelItem.subskills.map((subskill, i) => (
                                                                    <div key={`${user.namaUser}-${skill.namaSkill}-${levelItem.level}-${subskill.namaSubskill}`} className={cn("size-4 rounded-xs bg-gray-300",
                                                                        subskill.isBaca && subskill.isLulus && "bg-green-500",
                                                                        subskill.isBaca && !subskill.isLulus && "bg-blue-500"
                                                                    )} />

                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            ))}

                        </div>
                        {/* <ScrollBar orientation="horizontal" /> */}
                        {/* </ScrollArea> */}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}