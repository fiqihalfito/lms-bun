import type { getSubskillByIdSkillAndLevel } from "@/features/subskill/services/getSubskillByIdSkillAndLevel";
import { Item, ItemActions, ItemContent, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { BanIcon, EyeIcon, LockIcon, PenLineIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SubskillLevelListProps = {
    subskills: Awaited<ReturnType<typeof getSubskillByIdSkillAndLevel>>;
}

export function SubskillLevelList({ subskills }: SubskillLevelListProps) {
    return (
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
    )
}