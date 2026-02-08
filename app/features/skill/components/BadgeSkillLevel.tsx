import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

type BadgeSkillLevelProps = {
    namaSkill?: string
    level?: string
}

export default function BadgeSkillLevel({ namaSkill, level }: BadgeSkillLevelProps) {
    return (
        <div className="mb-6">
            <Badge
                variant="outline"
                className="px-4 py-2 text-base font-medium rounded-full border-zinc-200 dark:border-zinc-800 bg-background shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
            >
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500 fill-yellow-500" />
                <span className="text-foreground">{namaSkill ?? "Skill"}</span>
                <span className="mx-3 h-4 w-[1px] bg-zinc-300 dark:bg-zinc-700"></span>
                <span className="text-muted-foreground font-normal">Level {level ?? "Level"}</span>
            </Badge>
        </div>
    );
}