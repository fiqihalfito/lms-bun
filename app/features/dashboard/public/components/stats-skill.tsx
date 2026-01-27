import { Progress } from "@/components/ui/progress"
import type { getSkillStats } from "../services/getSkillStats"

type StatsSkillProps = {
    statsSkill: Awaited<ReturnType<typeof getSkillStats>>
}

export function StatsSkill({ statsSkill }: StatsSkillProps) {
    return (
        <div>
            <h1 className="text-xl font-bold text-foreground mb-4">Stats SubSkill</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {statsSkill.map((item) => (
                    <div key={item.namaTeam} className="flex flex-col p-6 rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-bold mb-5 text-foreground border-b pb-3">{item.namaTeam}</h2>
                        <div className="space-y-5">
                            {item.skills.map((skill) => (
                                <div key={skill.namaSkill} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="font-medium text-muted-foreground">{skill.namaSkill}</span>
                                        <span className="font-bold text-foreground">{skill.persentaseTelahBaca}%</span>
                                    </div>
                                    <Progress value={skill.persentaseTelahBaca} className="h-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}