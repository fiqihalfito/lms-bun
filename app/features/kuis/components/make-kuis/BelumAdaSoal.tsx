import { CircleOffIcon } from "lucide-react";


export function BelumAdaSoal() {
    return (
        <div className="flex h-full items-center justify-center flex-col gap-3">
            <div className="bg-muted border p-3.5 rounded-lg">
                <CircleOffIcon />
            </div>
            <div className="text-center space-y-0.5">
                <h2 className="font-semibold">Belum ada soal</h2>
                <p className="text-muted-foreground text-sm">Silahkan tambah soal</p>
            </div>
        </div>
    )
}