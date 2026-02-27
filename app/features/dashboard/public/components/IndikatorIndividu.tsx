import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import type { IndividualIndikatorService } from "../services/IndividualIndikatorService"

type IndikatorIndividuProp = {
    baseIndividuIndikator: Awaited<ReturnType<typeof IndividualIndikatorService>>
}

export function IndikatorIndividu({ baseIndividuIndikator }: IndikatorIndividuProp) {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">Indikator Individu</h1>

            <div className="flex flex-col gap-y-2">
                {baseIndividuIndikator.map((team, i) => (
                    <div key={i}>
                        <h2 className="text-xl font-bold tracking-tight">{team.namaTeam}</h2>
                        <ScrollArea className="border">
                            <div className="p-4 flex gap-x-2">
                                {team.users.map((user, i) => (
                                    <div key={i} className="border rounded px-2">
                                        <div className="mb-4">
                                            <h3 className="text-base font-semibold tracking-tight text-center my-4 whitespace-nowrap px-4">{user.namaUser}</h3>
                                            <Separator />
                                        </div>
                                        <div className="flex gap-x-0.5">
                                            {user.skills.map((skill, i) => (
                                                <div key={i} className="border size-3 bg-slate-300">
                                                    <p>skill</p>
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