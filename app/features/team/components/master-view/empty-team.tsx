import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { XIcon } from "lucide-react"

export function EmptyTeam() {
    return (
        <Empty className="h-full bg-muted/50">
            <EmptyHeader>
                <EmptyMedia variant="icon" className="border border-2">
                    <XIcon />
                </EmptyMedia>
                <EmptyTitle>Tidak Ada Team</EmptyTitle>
                <EmptyDescription className="max-w-xs text-pretty">
                    Tidak ada team yang terdaftar
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
