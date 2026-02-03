import { Link } from "react-router";
import type { getSkillAndStats } from "../services/getSkillAndStats";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2Icon, CircleIcon } from "lucide-react";


interface SkillCardProps {
    skill: Awaited<ReturnType<typeof getSkillAndStats>>[number],
    idTeam: string
}

export function SkillCard({ skill, idTeam }: SkillCardProps) {
    // const totalProgress = calculateTotalProgress(skill.groupLevel);
    const isStarted = skill.persentaseProgress > 0;
    const isCompleted = skill.persentaseProgress === 100;


    return (
        <Link to={`/app/knowledge/team/${idTeam}/skill/${skill.idSkill}/level`}>
            <Card
                key={skill.idSkill}
                className={
                    cn(`flex flex-col h-full transition-all duration-200 hover:shadow-md border bg-card text-card-foreground shadow-sm `,
                        isStarted ? 'border-primary/20 ring-1 ring-primary/5' : 'border-border'
                    )}
            >
                <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3.5">


                            <div>
                                <CardTitle className="text-base font-semibold leading-tight tracking-tight text-foreground/90">
                                    {skill.namaSkill}
                                </CardTitle>
                                <CardDescription className="text-xs mt-1.5 font-medium flex items-center gap-2">
                                    Progress:
                                    <span className={isStarted ? "text-primary font-bold" : "text-muted-foreground"}>
                                        {skill.persentaseProgress}%
                                    </span>
                                </CardDescription>
                            </div>
                        </div>

                        {isCompleted && (
                            <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-200 shadow-none">
                                Selesai
                            </Badge>
                        )}
                    </div>

                    {/* Global Progress Bar */}
                    <div className="mt-5 space-y-1.5">
                        <Progress value={skill.persentaseProgress} className="h-2" />
                    </div>
                </CardHeader>

                <Separator className="bg-border/60" />

                <CardContent className="pt-4 flex-1">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-3  ">
                            <h4 className="text-xs font-medium text-muted-foreground">Baca</h4>
                            {skill.groupLevel && Object.entries(skill.groupLevel).map(([levelKey, data]) => {
                                const isLevelDone = data.sudahBaca === data.jumlahSubskill;

                                return (
                                    <div key={levelKey} className="group">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <div className="flex items-center gap-2">
                                                {data.sudahBaca > 0 ? (
                                                    <CheckCircle2Icon className={`w-3.5 h-3.5 ${isLevelDone ? 'text-green-600' : 'text-primary'}`} />
                                                ) : (
                                                    <CircleIcon className="w-3.5 h-3.5 text-muted-foreground/30" />
                                                )}
                                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                    Level {levelKey}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground font-mono bg-secondary/50 px-1.5 py-0.5 rounded border border-border/50">
                                                {data.sudahBaca}/{data.jumlahSubskill}
                                            </span>
                                        </div>
                                        <Progress
                                            value={data.sudahBaca / data.jumlahSubskill * 100}
                                            className="h-1.5"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xs font-medium text-muted-foreground">Kuis</h4>
                            {skill.groupLevel && Object.entries(skill.groupLevel).map(([levelKey, data]) => {
                                const isLevelDone = data.lulusKuis === data.jumlahSubskill;

                                return (
                                    <div key={levelKey} className="group">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <div className="flex items-center gap-2">
                                                {data.lulusKuis > 0 ? (
                                                    <CheckCircle2Icon className={`w-3.5 h-3.5 ${isLevelDone ? 'text-green-600' : 'text-primary'}`} />
                                                ) : (
                                                    <CircleIcon className="w-3.5 h-3.5 text-muted-foreground/30" />
                                                )}
                                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                                                    Level {levelKey}
                                                </span>
                                            </div>
                                            <span className="text-[10px] text-muted-foreground font-mono bg-secondary/50 px-1.5 py-0.5 rounded border border-border/50">
                                                {data.lulusKuis}/{data.jumlahSubskill}
                                            </span>
                                        </div>
                                        <Progress
                                            value={data.lulusKuis / data.jumlahSubskill * 100}
                                            className="h-1.5"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </CardContent>
            </Card>
        </Link>

    );
}