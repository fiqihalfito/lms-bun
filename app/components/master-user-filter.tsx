import { Checkbox } from "./ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./ui/field";
import { parseAsNativeArrayOf, parseAsString, useQueryState } from "nuqs";
import type { TeamService } from "@/features/team/services/TeamService";

interface MasterUserFilterProps {
  teams: Awaited<ReturnType<typeof TeamService.getTeamsAll>>;
}

export function MasterUserFilter({ teams }: MasterUserFilterProps) {
  const [teamQuery, setTeamQuery] = useQueryState(
    "team",
    parseAsNativeArrayOf(parseAsString).withOptions({ shallow: false }),
  );

  return (
    <div className="w-60 p-4">
      <FieldGroup>
        <FieldSet>
          <FieldLegend variant="label">Team</FieldLegend>
          <FieldGroup className="gap-2">
            {teams.map((teamItem) => (
              <Field key={teamItem.idTeam} orientation={"horizontal"}>
                <Checkbox
                  id={`team-${teamItem.idTeam}`}
                  name="team"
                  value={teamItem.idTeam}
                  checked={teamQuery.includes(teamItem.idTeam)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setTeamQuery((tq) => [...tq, teamItem.idTeam]);
                    } else {
                      setTeamQuery((tq) =>
                        tq.filter((team) => team !== teamItem.idTeam),
                      );
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
  );
}
