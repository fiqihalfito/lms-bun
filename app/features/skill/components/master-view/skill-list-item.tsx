import { cn } from "@/lib/utils"
import { NavLink } from "react-router"
import type { getSkillsByIdTeam } from "../../services/master/getSkillsByIdTeam"

type SkillListItemProps = {
    item: Awaited<ReturnType<typeof getSkillsByIdTeam>>[number]
    no: number
}

export function SkillListItem({ item, no }: SkillListItemProps) {
    const { namaSkill, idSkill, jumlahSubskill } = item
    return (
        <NavLink to={`skill/${idSkill}`}>
            {({ isActive }) => (
                <div className={cn("p-4 flex flex-row gap-4 items-center", isActive && "bg-primary text-primary-foreground")}>
                    <div className={cn("h-8 w-8 border border-slate-300 rounded text-xs flex items-center justify-center", isActive && "bg-primary-foreground text-primary font-bold")}>
                        {no}
                    </div>
                    <div>
                        <h4 className="text-sm font-medium">{namaSkill}</h4>
                        <p className={cn("text-xs text-muted-foreground", isActive && "text-primary-foreground")}>{jumlahSubskill || 0} Subskill</p>
                    </div>
                </div>
            )}

        </NavLink>

    )
}