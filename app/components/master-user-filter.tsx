import type { getTeamsAll } from "@/features/team/services/get-teams-all"
import { Checkbox } from "./ui/checkbox"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "./ui/field"
import { Form } from "react-router"
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs"

interface MasterUserFilterProps {
    teams: Awaited<ReturnType<typeof getTeamsAll>>
}

export function MasterUserFilter({ teams }: MasterUserFilterProps) {

    const [teamQuery, setTeamQuery] = useQueryState(
        'team',
        parseAsNativeArrayOf(parseAsString).withOptions({ shallow: false })
    )

    return (
        <div className="w-60 p-4">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend variant="label">
                        Team
                    </FieldLegend>
                    <FieldGroup className="gap-2">
                        {teams.map((teamItem) => (
                            <Field key={teamItem.idTeam} orientation={"horizontal"}>
                                <Checkbox id={`team-${teamItem.idTeam}`}
                                    name="team"
                                    value={teamItem.idTeam}
                                    checked={teamQuery.includes(teamItem.idTeam)}
                                    onCheckedChange={(checked) => {
                                        if (checked) {
                                            setTeamQuery(tq => [...tq, teamItem.idTeam])
                                        } else {
                                            setTeamQuery(tq => tq.filter((team) => team !== teamItem.idTeam))
                                        }
                                    }}
                                />
                                <FieldLabel
                                    htmlFor={`team-${teamItem.idTeam}`}
                                    className="font-normal"
                                >
                                    {teamItem.namaTeam}
                                </FieldLabel>
                            </Field>
                        ))}
                    </FieldGroup>
                </FieldSet>
            </FieldGroup>

        </div>
    )
}