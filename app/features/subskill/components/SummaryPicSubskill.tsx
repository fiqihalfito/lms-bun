import type { getSkillProgressDetailByIdSkill } from "../services/getSkillProgressDetailByIdSkill"
import { Badge } from "@/components/ui/badge"
import { DatabaseIcon, FileTextIcon, PyramidIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"

type SummaryPicSubSkillProps = {
    skillProgressDetail: Awaited<ReturnType<typeof getSkillProgressDetailByIdSkill>>[number]
    namaTeam: string
}


export function SummaryPicSubSkill({ skillProgressDetail, namaTeam }: SummaryPicSubSkillProps) {

    const percentage = Math.round(
        (skillProgressDetail.jumlahUpload / skillProgressDetail.jumlahSubkill) * 100
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

            {/* Card Utama: Info Skill */}
            <Card className="md:col-span-2 shadow-none border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <PyramidIcon size={120} />
                </div>
                <CardContent className="p-8 relative z-10">
                    <div className="space-y-4">
                        <Badge className="bg-primary/20 text-primary-foreground border-none hover:bg-primary/30">
                            {namaTeam}
                        </Badge>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {skillProgressDetail.namaSkill}
                            </h1>
                            <p className="text-slate-400 text-sm flex items-center gap-2">
                                <DatabaseIcon className="h-4 w-4" />
                                {skillProgressDetail.jumlahUpload} dari {skillProgressDetail.jumlahSubkill} dokumen subskill terupload
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Card Progress: Mencolok & Elegan */}
            <Card className="flex flex-col justify-center items-center p-6 border-2 border-primary/10 shadow-sm relative overflow-hidden">
                {/* Background Accent */}
                <div className="absolute inset-0 bg-primary/[0.02] pointer-events-none" />

                <div className="relative flex items-center justify-center">
                    {/* Progress Ring Sederhana (SVG) */}
                    <svg className="h-24 w-24 transform -rotate-90">
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-muted/20"
                        />
                        <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * percentage) / 100}
                            strokeLinecap="round"
                            className="text-primary transition-all duration-1000 ease-in-out"
                        />
                    </svg>
                    <span className="absolute text-xl font-bold">{percentage}%</span>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Completion</p>
                    <p className="text-sm text-foreground font-medium">
                        {skillProgressDetail.jumlahUpload} <span className="text-muted-foreground font-normal">of</span> {skillProgressDetail.jumlahSubkill} Documents
                    </p>
                </div>
            </Card>
        </div>
    )
}