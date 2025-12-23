import { Spinner } from "@/components/ui/spinner";

export function DokumenViewerLoading() {
    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm transition-all duration-300">
            <div className="flex flex-col items-center gap-3">
                <Spinner className="h-8 w-8 text-primary" />
                <div className="flex flex-col items-center gap-1">
                    <p className="text-sm font-medium text-foreground/80">Memuat Dokumen</p>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest animate-pulse">
                        Mohon Tunggu
                    </p>
                </div>
            </div>
        </div>
    );
}