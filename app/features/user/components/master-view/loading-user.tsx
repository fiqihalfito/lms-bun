import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
import { IconBell } from "@tabler/icons-react"
import { RefreshCcwIcon, XIcon } from "lucide-react"

export function LoadingUser() {
    return (
        <Empty className="h-full bg-muted/50">
            <EmptyHeader>
                <EmptyMedia variant="icon" className="border border-2">
                    <Spinner />
                </EmptyMedia>
                <EmptyTitle>Loading...</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                    Loading data user...
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
