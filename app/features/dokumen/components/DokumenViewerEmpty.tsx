
import { IconBell } from "@tabler/icons-react"
import { BookXIcon, RefreshCcwIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

export function DokumenViewerEmpty() {
    return (
        <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30% border">
            <EmptyHeader>
                <EmptyMedia variant="icon" className="border">
                    <BookXIcon />
                </EmptyMedia>
                <EmptyTitle>Dokumen Tidak Ditemukan</EmptyTitle>
                <EmptyDescription>
                    Dokumen tidak ditemukan atau belum diupload
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}