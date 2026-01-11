import { getSubskillByIdSkillAndLevel } from "@/features/subskill/services/getSubskillByIdSkillAndLevel";
import type { Route } from "./+types/knowledge-subskill";
import { HeaderRoute } from "@/components/header-route";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { BanIcon, EyeIcon, LockIcon, PenLineIcon } from "lucide-react";
import { BreadCrumb } from "@/components/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { userContext } from "@/lib/context";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const subskills = await getSubskillByIdSkillAndLevel(params.idSkill, Number(params.level), user.idUser)

    return { subskills }
}

export default function KnowledgeSubskillRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskills } = loaderData

    const breadcrumb = useBreadcrumbs([
        { label: "Kategori", to: `/app/dokumen` },
        { label: "Team", to: `/app/knowledge/team` },
        { label: "Skill", to: `/app/knowledge/team/${params.idTeam}/skill` },
        { label: "Level", to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level` },
        { label: "Subskill", to: `/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level/${params.level}/subskill` },
    ])

    return (
        <div>
            <BreadCrumb routeBreadCrumb={breadcrumb} />
            <HeaderRoute title="Subskill" description="list subskill berisi dokumen dan kuis yang harus dilengkapi" />
            <ItemGroup className="gap-y-3">
                {subskills.map((subskill, i) => (
                    <Item variant="outline" key={i}>
                        {/* <Link to={`${subskill.idSubSkill}`}> */}
                        <ItemMedia variant="icon">
                            {i + 1}
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>{subskill.namaSubSkill}</ItemTitle>
                            {/* <ItemDescription>
                                diuji
                            </ItemDescription> */}
                            {subskill.dokumen?.statusBacaOne ? (
                                <Badge variant="default">Sudah dibaca</Badge>
                            ) : (
                                <Badge variant="destructive">Belum dibaca</Badge>
                            )}
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