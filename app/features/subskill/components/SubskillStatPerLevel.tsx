import { BookOpenIcon, FlagIcon, TrophyIcon } from "lucide-react"
import type { getSubskillStatPerLevel } from "../services/getSubskillStatPerLevel"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useParams } from "react-router"


type SubskillStatPerLevelProps = {
    subskillStatPerLevel: Awaited<ReturnType<typeof getSubskillStatPerLevel>>
}



export function SubskillStatPerLevel({ subskillStatPerLevel }: SubskillStatPerLevelProps) {
    const {
        jumlahSudahBaca,
        jumlahSudahKuis,
        jumlahSubskillPerLevel,
        persentaseProgress
    } = subskillStatPerLevel

    const params = useParams()

    return (
        <div className="border p-4 rounded-md mb-8  shadow-sm">
            {/* Progress */}
            <div className="flex items-center gap-x-8 mb-4">
                <div className="flex-1">
                    <div className="flex items-center justify-between gap-x-2">
                        <h2 className="font-semibold mb-2">Progress Level {params.level}</h2>
                        <FlagIcon className="text-slate-500 size-5" />
                    </div>
                    <Progress value={persentaseProgress} />
                </div>
                <div className="text-7xl font-semibold font-mono text-slate-600">{persentaseProgress}%</div>
            </div>


            {/* cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-md p-4 flex items-center gap-x-6 shadow">
                    <div className="p-3 rounded bg-primary/10">
                        <BookOpenIcon className="text-primary size-10" />
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-sm text-muted-foreground">Sudah Dibaca</h2>
                        <div className="text-3xl font-semibold font-mono text-muted-foreground">{jumlahSudahBaca} / {jumlahSubskillPerLevel}</div>
                    </div>
                </div>
                <div className="border rounded-md p-4 flex items-center gap-x-6 shadow">
                    <div className="p-3 rounded bg-amber-400/10">
                        <TrophyIcon className="text-amber-400 size-10" />
                    </div>
                    <div className="">
                        <h2 className="font-semibold text-sm text-muted-foreground">Sudah Kuis</h2>
                        <div className="text-3xl font-semibold font-mono text-muted-foreground">{jumlahSudahKuis} / {jumlahSubskillPerLevel}</div>
                    </div>
                </div>
            </div>
        </div>


    )
}