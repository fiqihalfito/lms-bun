import type { Route } from "./+types/finish"
import { getKuisProgressById } from "@/features/kuis/services/getKuisProgressById"
import { getToast } from "remix-toast"
import { data, Link } from "react-router"
import { useToastEffect } from "@/hooks/use-toast"

export async function loader({ request, params, context }: Route.LoaderArgs) {
    const kuisProgress = await getKuisProgressById(params.idKuisProgress)


    const { toast, headers } = await getToast(request)

    return data({ kuisProgress: kuisProgress[0], toast }, { headers })
}

export default function KuisFinishRoute({ loaderData }: Route.ComponentProps) {
    const { kuisProgress, toast } = loaderData

    useToastEffect(toast)

    return (
        <div className="flex-1 flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6 bg-muted/30">
                <div className="w-full max-w-md bg-background rounded-3xl shadow-xl border p-8 space-y-8 text-center">
                    <div className="space-y-2">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" /><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" /><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" /></svg>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight">Ujian Selesai!</h1>
                        <p className="text-muted-foreground">Anda telah menyelesaikan ujian ini.</p>
                    </div>

                    <div className="py-6 border-y flex flex-col items-center gap-1">
                        <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Skor Akhir</span>
                        <span className="text-7xl font-black text-primary">{kuisProgress?.totalScore ?? 0}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-muted/50 text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase mb-1">Benar</p>
                            <p className="text-xl font-bold">{kuisProgress?.jumlahBenar ?? 0} / {kuisProgress?.jumlahSoal ?? 0}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-muted/50 text-center">
                            <p className="text-xs text-muted-foreground font-medium uppercase mb-1">Waktu</p>
                            <p className="text-xl font-bold">
                                {Math.floor((kuisProgress?.totalWaktuPengerjaanDetik ?? 0) / 60)}m {(kuisProgress?.totalWaktuPengerjaanDetik ?? 0) % 60}s
                            </p>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Link
                            to="/kuis"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-xl shadow-md bg-primary hover:bg-primary/90 focus:shadow-outline focus:outline-none"
                        >
                            Kembali ke Daftar Subskill
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}