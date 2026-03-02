import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function LoadingContentDashboard() {
    return (
        <Empty className="h-full bg-muted/30">
            <EmptyHeader>
                <EmptyMedia variant="icon" className="size-16" >
                    {/* <IconBell /> */}
                    <Spinner className="size-12" />
                </EmptyMedia>
                <EmptyTitle>
                    <span className="animate-pulse text-muted-foreground tracking-wide">Sedang memuat ...</span>
                </EmptyTitle>
            </EmptyHeader>
        </Empty>
    )
}