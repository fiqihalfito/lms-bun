import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { getBaseIndividuIndikator } from "../services/getBaseIndividuIndikator"
import { Separator } from "@/components/ui/separator"

type IndikatorIndividuProp = {
    baseIndividuIndikator: Awaited<ReturnType<typeof getBaseIndividuIndikator>>
}

export function IndikatorIndividu({ baseIndividuIndikator }: IndikatorIndividuProp) {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Indikator Individu</h1>

            <div className="flex flex-col gap-y-2">
                {baseIndividuIndikator.map((team) => (
                    <div key={team.idTeam}>
                        <h2 className="text-xl font-bold tracking-tight">{team.namaTeam}</h2>
                        <ScrollArea className="border">
                            <div className="p-4 flex gap-x-2">
                                {team.skill.map((skill, i) => (
                                    <div key={i} className="border rounded px-2">
                                        <div className="mb-4">
                                            <h3 className="text-base font-semibold tracking-tight text-center my-4 whitespace-nowrap px-4">{skill.namaSkill}</h3>
                                            <Separator />
                                        </div>
                                        <div className="flex gap-x-0.5">
                                            {skill.subSkill.map((subSkill, i) => (
                                                <div key={i} className="border size-3 bg-slate-300">
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                ))}

                            </div>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>

                    </div>
                ))}
            </div>
        </div>
    )
}