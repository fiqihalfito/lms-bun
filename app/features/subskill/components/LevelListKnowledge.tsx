import type { getLevelSubskillListDataByIdSkill } from "../services/getSubskillLevelByIdSkill";
import { Item, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Lock, Trophy, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useParams } from "react-router";

type LevelListKnowledge = {
    subskillLevel: Awaited<ReturnType<typeof getLevelSubskillListDataByIdSkill>>;
}

export const LevelListKnowledge = ({ subskillLevel }: LevelListKnowledge) => {
    const params = useParams();
    return (
        <ItemGroup className=" gap-6">
            {subskillLevel.map((item) => {
                const levelLink = `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level/${item.level}/subskill`;

                const content = (
                    <>
                        <ItemMedia
                            variant="icon"
                            className={cn(
                                "size-14 rounded-2xl border-2 transition-all duration-500 group-hover:scale-110",
                                item.isUnlocked ? "bg-muted text-muted-foreground border-transparent" :
                                    item.isUnlocked ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950/30 dark:border-emerald-900/50" :
                                        "bg-primary/5 text-primary border-primary/20"
                            )}
                        >
                            {!item.isUnlocked ? (
                                <Lock className="size-6" />
                            ) : item.isCompleted ? (
                                <Trophy className="size-7 text-yellow-500" />
                            ) : (
                                <div className="text-2xl font-black">{item.level}</div>
                            )}
                        </ItemMedia>

                        <ItemContent className="gap-5">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div className="space-y-1">
                                    <ItemTitle className="text-xl font-bold tracking-tight">
                                        Level {item.level}
                                    </ItemTitle>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
                                        <div className="flex items-center gap-1.5">
                                            <CheckCircle2 className="size-4 text-primary/70" />
                                            <span>{item.sudahBaca}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <div className="size-1.5 rounded-full bg-orange-400" />
                                            <span> Subskill</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 border-l pl-4 border-border">
                                            <Clock className="size-4 text-primary/70" />
                                            {/* <span>Total: {item.totalTimeSpent}</span> */}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-start md:self-center">
                                    {item.isUnlocked ? (
                                        <Badge variant="outline" className="px-3 py-1 bg-muted/50 text-muted-foreground border-transparent">
                                            <Lock className="size-3 mr-1.5" />
                                            Terkunci
                                        </Badge>
                                    ) : item.isCompleted ? (
                                        <Badge className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-sm shadow-emerald-200">
                                            <Trophy className="size-3 mr-1.5" />
                                            Lulus
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="px-3 py-1 border-primary/50 text-primary bg-primary/5 animate-pulse">
                                            Sedang Berjalan
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-muted-foreground uppercase tracking-wider">Metrik Penguasaan</span>
                                    <span className="font-bold text-primary">{item.persentasePerLevel}%</span>
                                </div>
                                <Progress
                                    value={item.persentasePerLevel}
                                    className={cn(
                                        "h-2.5 rounded-full",
                                        item.isCompleted ? "bg-emerald-100 dark:bg-emerald-950/20" : "bg-primary/10"
                                    )}
                                />
                            </div>
                        </ItemContent>

                        {item.isUnlocked && (
                            <ItemMedia className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                <ArrowRight className="size-6 text-primary" />
                            </ItemMedia>
                        )}
                    </>
                );

                return (
                    <Item
                        key={item.level}
                        variant="outline"
                        className={cn(
                            "relative overflow-hidden p-6 transition-all duration-300 group",
                            !item.isUnlocked ? "opacity-75 grayscale-[0.3] cursor-not-allowed bg-muted/10" : "hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 translate-y-0 hover:scale-101",
                            !item.isUnlocked && "border-emerald-500/30 bg-emerald-500/[0.02]"
                        )}
                        asChild={!item.isUnlocked}
                    >
                        {item.isUnlocked ? (
                            <Link to={levelLink} className="flex items-center w-full gap-6">
                                {content}
                            </Link>
                        ) : (
                            <div className="flex items-center w-full gap-6">
                                {content}
                            </div>
                        )}
                    </Item>
                );
            })}
        </ItemGroup>
    )
}