import { Button } from "@/components/ui/button"
import type { getTeamsAll } from "@/features/team/services/get-teams-all"
import { cn } from "@/lib/utils"
import { parseAsString, useQueryState } from "nuqs"
import { useOptimisticSearchParams } from "nuqs/adapters/react-router/v7"
import { Form } from "react-router"

type TeamFilterProps = {
    teams: Awaited<ReturnType<typeof getTeamsAll>>,
}


export function TeamFilter({ teams }: TeamFilterProps) {

    // const [team, setTeam] = useQueryState('team', parseAsString.withDefault(teams[0].idTeam).withOptions({ shallow: false }))
    const searchParams = useOptimisticSearchParams()
    const team = searchParams.get('team') || teams[0].idTeam


    return (
        <div className="flex items-center gap-x-2">
            <Form method="get">
                {teams.map((item) => (
                    <Button key={item.idTeam}
                        name="team"
                        value={item.idTeam}
                        variant={"ghost"}
                        className={cn("w-60 py-5 rounded-none border-b-3 border-b-transparent font-semibold text-muted-foreground hover:bg-transparent",
                            item.idTeam === team && "border-b-black text-accent-foreground"
                        )}
                    // onClick={() => setTeam(item.idTeam)}
                    >
                        {item.namaTeam}
                    </Button>
                ))}
            </Form>

        </div>
    )
}