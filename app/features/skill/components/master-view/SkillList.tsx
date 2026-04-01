import type { getSkillsByIdTeam } from "../../services/master/getSkillsByIdTeam"
import { SkillListItem } from "./skill-list-item"

type SkillListProps = {
    skills: Awaited<ReturnType<typeof getSkillsByIdTeam>>
}

export function SkillList({ skills }: SkillListProps) {

    if (skills.length == 0) {
        return (
            <div className="space-y-2 mt-4 mx-4">
                <p className="text-sm text-muted-foreground">Skill tidak ditemukan</p>
            </div>
        )
    }

    return (
        <div className="space-y-2 mt-4">
            {skills.map((skill, index) => (
                <SkillListItem key={skill.idSkill} item={skill} no={index + 1} />
            ))}
        </div>
    )
}