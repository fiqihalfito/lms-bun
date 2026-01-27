import { userContext } from "@/lib/context";
import type { Route } from "./+types/skill";
import { getSkillByIdPicSubSkill } from "@/features/subskill/services/getSkillByIdPicSubSkill";
import { HeaderRoute } from "@/components/header-route";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, BookOpenIcon, CheckCircle2Icon, FileTextIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const skills = await getSkillByIdPicSubSkill(user.idUser)

    return { skills }
}


export default function SkillPicSubSkillRoute({ loaderData, params }: Route.ComponentProps) {

    const { skills } = loaderData

    return (
        <div>
            <HeaderRoute title="Skill" description="Skill perlu upload dokumen dan membuat kuis" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill, i) => {
                    // Kalkulasi Persentase
                    const totalDocs = skill?.jumlahSubkill || 0;
                    const uploadedDocs = skill?.jumlahUpload || 0;
                    const percentage = totalDocs > 0
                        ? Math.round((uploadedDocs / totalDocs) * 100)
                        : 0;

                    return (
                        <Link
                            key={skill?.idSkill}
                            to={`skill/${skill?.idSkill}/subskill`}
                            className="block h-full transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Card className="h-full border-l-4 border-l-primary shadow-sm hover:shadow-md">
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                    <div className="space-y-1">
                                        <Badge variant="secondary" className="mb-2 w-fit text-xs font-normal">
                                            Skill #{i + 1}
                                        </Badge>
                                        <CardTitle className="text-lg font-bold leading-tight">
                                            {skill?.namaSkill}
                                        </CardTitle>
                                    </div>
                                    {/* Ikon Status: Hijau jika 100%, Abu jika belum */}
                                    {percentage === 100 ? (
                                        <CheckCircle2Icon className="h-6 w-6 text-green-500" />
                                    ) : (
                                        <div className="rounded-full bg-primary/10 p-2 text-primary">
                                            <BookOpenIcon className="h-5 w-5" />
                                        </div>
                                    )}
                                </CardHeader>

                                <CardContent>
                                    <div className="mt-4 space-y-3">
                                        {/* Statistik Kecil dengan Ikon */}
                                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1.5">
                                                <FileTextIcon className="h-4 w-4" />
                                                <span>{skill?.jumlahSubkill} Subskill</span>
                                            </div>
                                            <span className="font-medium text-foreground">
                                                {uploadedDocs}/{totalDocs} Dokumen
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="space-y-1.5">
                                            <Progress value={percentage} className="h-2" />
                                            <div className="flex justify-between text-xs text-muted-foreground">
                                                <span>Kelengkapan</span>
                                                <span>{percentage}%</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Call to Action Visual (Optional) */}
                                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                                        Lihat Detail <ArrowRightIcon className="ml-1 h-4 w-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}