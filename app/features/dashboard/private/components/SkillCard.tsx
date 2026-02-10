import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { getSkillAndStats } from "../services/getSkillAndStats"
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Trophy, TrendingUp, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type SkillCardProp = {
    skillData: Awaited<ReturnType<typeof getSkillAndStats>>[number]["groupTeam"][number]
}

export function SkillCard({ skillData }: SkillCardProp) {
    const readProgress = (skillData.totalBaca / skillData.totalSubskill) * 100;
    const quizProgress = (skillData.totalLulusKuis / skillData.totalSubskill) * 100;
    const overallProgress = ((skillData.totalBaca + skillData.totalLulusKuis) / (skillData.totalSubskill * 2)) * 100;

    const levels = skillData.groupLevel ? Object.entries(skillData.groupLevel) : [];
    const isFullyCompleted = skillData.totalBaca === skillData.totalSubskill &&
        skillData.totalLulusKuis === skillData.totalSubskill;

    return (
        <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-xl border-border/40 bg-gradient-to-br from-card via-card to-card/95">
            {/* Decorative background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

            {/* Completion badge */}
            {isFullyCompleted && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg animate-in fade-in slide-in-from-top-2 duration-500">
                        <Sparkles className="w-3.5 h-3.5" />
                        Selesai
                    </div>
                </div>
            )}

            <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                        <CardTitle className="text-xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                            {skillData.namaSkill}
                        </CardTitle>
                        <CardDescription className="text-sm flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-primary" />
                            <span className="font-medium">
                                {Math.round(overallProgress)}% Progress Keseluruhan
                            </span>
                        </CardDescription>
                    </div>
                </div>

                {/* Overall progress bar */}
                <div className="mt-4 space-y-2">
                    <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${overallProgress}%` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </CardHeader>

            <Separator className="bg-gradient-to-r from-transparent via-border/60 to-transparent" />

            <CardContent className="pt-6 relative">
                {/* Stats overview */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Baca
                            </h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">
                                    {skillData.totalBaca}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    / {skillData.totalSubskill}
                                </span>
                            </div>
                            <Progress
                                value={readProgress}
                                className="h-1.5 bg-blue-500/10"
                            />
                            <p className="text-xs text-muted-foreground font-medium">
                                {Math.round(readProgress)}% selesai
                            </p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-xl p-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-emerald-500/10 rounded-lg">
                                <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Kuis
                            </h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-foreground">
                                    {skillData.totalLulusKuis}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    / {skillData.totalSubskill}
                                </span>
                            </div>
                            <Progress
                                value={quizProgress}
                                className="h-1.5 bg-emerald-500/10"
                            />
                            <p className="text-xs text-muted-foreground font-medium">
                                {Math.round(quizProgress)}% lulus
                            </p>
                        </div>
                    </div>
                </div>

                {/* Level breakdown */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                        <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                        Detail Per Level
                        <div className="h-px flex-1 bg-gradient-to-l from-border to-transparent" />
                    </h4>

                    <div className="space-y-2">
                        {levels.map(([levelKey, data]) => {
                            const levelReadProgress = (data.sudahBaca / data.jumlahSubskill) * 100;
                            const levelQuizProgress = (data.lulusKuis / data.jumlahSubskill) * 100;
                            const isLevelComplete = data.sudahBaca === data.jumlahSubskill &&
                                data.lulusKuis === data.jumlahSubskill;

                            return (
                                <div
                                    key={levelKey}
                                    className={cn(
                                        "group/level relative overflow-hidden rounded-lg border transition-all duration-300",
                                        isLevelComplete
                                            ? "bg-gradient-to-r from-green-500/5 to-emerald-500/5 border-green-500/30"
                                            : "bg-card/50 border-border/40 hover:border-border/60"
                                    )}
                                >
                                    <div className="p-3">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <div className={cn(
                                                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                                                    isLevelComplete
                                                        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25"
                                                        : "bg-secondary text-muted-foreground group-hover/level:bg-primary group-hover/level:text-primary-foreground"
                                                )}>
                                                    {levelKey}
                                                </div>
                                                <span className="text-sm font-semibold text-foreground">
                                                    Level {levelKey}
                                                </span>
                                            </div>
                                            {isLevelComplete && (
                                                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400">
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-semibold">Selesai</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-muted-foreground font-medium">Baca</span>
                                                    <span className="font-mono font-semibold text-foreground">
                                                        {data.sudahBaca}/{data.jumlahSubskill}
                                                    </span>
                                                </div>
                                                <div className="relative h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                                                    <div
                                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                                                        style={{ width: `${levelReadProgress}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-1.5">
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-muted-foreground font-medium">Kuis</span>
                                                    <span className="font-mono font-semibold text-foreground">
                                                        {data.lulusKuis}/{data.jumlahSubskill}
                                                    </span>
                                                </div>
                                                <div className="relative h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                                                    <div
                                                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                                                        style={{ width: `${levelQuizProgress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </CardContent>

            {/* Bottom gradient accent */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Card>
    )
}