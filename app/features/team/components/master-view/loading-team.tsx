import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function LoadingTeam() {
    return (
        <Empty className="h-full bg-muted/50">
            <EmptyHeader>
                <EmptyMedia variant="icon" className="border border-2">
                    <Spinner />
                </EmptyMedia>
                <EmptyTitle>Loading...</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                    Loading data team...
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
