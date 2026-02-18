import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item"
import type { getJumlahLulusPerSkill } from "../services/getJumlahLulusPerSkill"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type StatLulusSkillProp = {
    teamStat: Awaited<ReturnType<typeof getJumlahLulusPerSkill>>
}

export function StatLulusSkill({ teamStat }: StatLulusSkillProp) {
    return (
        <div className="mt-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">Total Lulus Skill</h1>
            <div className="grid grid-cols-2 gap-6">
                {teamStat?.map((team) => (
                    <div key={team.namaTeam} className="flex flex-col gap-2 border p-8 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold tracking-tight">{team.namaTeam}</h3>
                            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded">
                                {team.jumlahOrangPerTeam} Members
                            </span>
                        </div>
                        <ul className="flex flex-col gap-3">
                            {team.skill.map((skill, i) => (
                                <Item key={i} variant="outline" size="default" className="shadow">
                                    <ItemMedia variant="default">
                                        <div className="flex items-center justify-center shadow border rounded-md w-8 h-8 text-xs font-semibold">
                                            {i + 1}
                                        </div>
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle className="mb-1">{skill.namaSkill}</ItemTitle>
                                        <ItemDescription>
                                            <Progress value={skill.jumlahLulus / team.jumlahOrangPerTeam * 100} className="h-2" />
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        {/* <Button size="sm" variant="outline">
                                        Review
                                    </Button> */}
                                        <div className="font-mono text-lg">
                                            {skill.jumlahLulus}/{team.jumlahOrangPerTeam}
                                        </div>
                                    </ItemActions>
                                </Item>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

    )
}