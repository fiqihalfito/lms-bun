import { getSubskillByIdSkillAndLevel } from "@/features/subskill/services/getSubskillByIdSkillAndLevel";
import type { Route } from "./+types/knowledge-subskill";
import { HeaderRoute } from "@/components/header-route";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { BanIcon, EyeIcon, LockIcon, PenLineIcon, SparklesIcon } from "lucide-react";
import { BreadCrumb } from "@/components/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { userContext } from "@/lib/context";
import { useLocalStorage } from 'usehooks-ts'
import { useEffect } from "react";
import { getSubskillStatPerLevel } from "@/features/subskill/services/getSubskillStatPerLevel";
import { SubskillStatPerLevel } from "@/features/subskill/components/SubskillStatPerLevel";
import { getNamaSkillByIdSkill } from "@/features/skill/services/getNamaSkillByIdSkill";
import BadgeSkillLevel from "@/features/skill/components/BadgeSkillLevel";
import { cn } from "@/lib/utils";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const subskills = await getSubskillByIdSkillAndLevel(params.idSkill, Number(params.level), user.idUser)
    const subskillStatPerLevel = await getSubskillStatPerLevel(params.idSkill, Number(params.level), user.idUser)
    const namaSkill = await getNamaSkillByIdSkill(params.idSkill)

    return { subskills, subskillStatPerLevel, namaSkill }
}

// set current url here to localStorage to redirect back to this page after submit kuis


export default function KnowledgeSubskillRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskills, subskillStatPerLevel, namaSkill } = loaderData

    const breadcrumb = useBreadcrumbs([
        { label: "Kategori", to: `/app/dokumen` },
        { label: "Team", to: `/app/knowledge/team` },
        { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
        { label: "Level", to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level` },
        { label: "Subskill", to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level/${params.level}/subskill` },
    ])

    const location = useLocation()
    const [redirectBackAfterKuis, setRedirectBackAfterKuis, removeRedirectBackAfterKuis] = useLocalStorage('redirectBackAfterKuis', "/")
    useEffect(() => {
        setRedirectBackAfterKuis(location.pathname)
    }, [location])

    return (
        <div>
            <BreadCrumb routeBreadCrumb={breadcrumb} />
            <HeaderRoute title="Subskill" description="list subskill berisi dokumen dan kuis yang harus dilengkapi" />

            <SubskillStatPerLevel subskillStatPerLevel={subskillStatPerLevel} />

            <BadgeSkillLevel namaSkill={namaSkill} level={params.level} />


            <ItemGroup className="gap-y-3">
                {subskills.map((subskill, i) => (
                    <Item variant="outline" key={i}>
                        {/* <Link to={`${subskill.idSubSkill}`}> */}
                        <ItemMedia variant="icon">
                            {i + 1}
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle className="font-semibold leading-none">{subskill.namaSubSkill}</ItemTitle>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                {subskill.pic?.namaUser && (
                                    <Badge variant="outline" className="font-normal text-muted-foreground">
                                        PIC: {subskill.pic.namaUser}
                                    </Badge>
                                )}
                                {subskill.dokumen?.statusBacaOne ? (
                                    <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600">Sudah dibaca</Badge>
                                ) : (
                                    <Badge variant="destructive">Belum dibaca</Badge>
                                )}
                                {subskill.kuisProgress?.idKuisProgress ? (
                                    <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600">Sudah Kuis</Badge>
                                ) : (
                                    <Badge variant="destructive">Belum Kuis</Badge>
                                )}
                                {subskill.kuisProgress?.idKuisProgress && (
                                    <Badge variant="default" className="bg-emerald-600 hover:bg-emerald-600">jumlah benar: {subskill.kuisProgress.jumlahBenar}/{subskill.kuisProgress.jumlahSoal}</Badge>
                                )}
                                {subskill.kuisProgress?.idKuisProgress && (
                                    <Badge variant="default" className={cn("bg-emerald-600", subskill.kuisProgress.persentaseBenar < 80 && "bg-red-600")}>persentase benar: {subskill.kuisProgress.persentaseBenar}%</Badge>
                                )}
                            </div>
                        </ItemContent>
                        <ItemActions>
                            {subskill.idDokumen ? (
                                <Button asChild>
                                    <Link to={`/app/dokumen/baca/${subskill.idDokumen}`}>
                                        <EyeIcon />
                                        Baca
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="secondary" disabled>
                                    <BanIcon />
                                    Dokumen belum diupload
                                </Button>
                            )}

                            {!subskill.dokumen?.statusBacaOne ? (
                                <Button variant="secondary" disabled>
                                    <LockIcon />
                                    Dokumen belum dibaca
                                </Button>
                            ) : subskill.kuis?.isLocked ? (
                                <Button variant="secondary" disabled>
                                    <LockIcon />
                                    Kuis terkunci
                                </Button>
                            ) : subskill.idKuis && (subskill.kuis?.questions?.length ?? 0) > 0 ? (
                                <Button asChild>
                                    <Link to={`/app/kuis/${subskill.idKuis}/start`}>
                                        <PenLineIcon />
                                        Mulai Kuis
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="secondary" disabled>
                                    <BanIcon />
                                    Kuis belum dibuat
                                </Button>
                            )}
                            {/* <Button variant="secondary" disabled>
                                <LockIcon />
                                Kuis terkunci
                            </Button> */}
                        </ItemActions>
                    </Item>
                ))}
            </ItemGroup>
        </div>
    )
}