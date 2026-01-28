import { getSubskillByIdSubskill } from "@/features/subskill/services/getSubskillByIdSubSkill";
import type { Route } from "./+types/make-kuis";
import invariant from "tiny-invariant";
import { createKuis } from "@/features/kuis/services/createKuis";
import { getAllQuestionsByIdKuis } from "@/features/kuis/services/getAllQuestionsByIdKuis";
import { HeaderRoute } from "@/components/header-route";
import { updateSubskill } from "@/features/subskill/services/updateSubskill";
import { Badge } from "@/components/ui/badge";
import { CalendarSyncIcon, ChevronLeftIcon, PencilIcon, PlusIcon, TimerIcon, TrashIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { data, Link, NavLink, Outlet, useFetcher } from "react-router";
import { BelumAdaSoal } from "@/features/kuis/components/make-kuis/BelumAdaSoal";
import { getToast } from "remix-toast";
import { useToastEffect } from "@/hooks/use-toast";
import { TombolTambahSoal } from "@/features/kuis/components/make-kuis/TombolTambahSoal";
import { SwitchKuisLocked } from "@/features/kuis/components/make-kuis/SwitchKuisLocked";
import { getKuisMetaDataByIdKuis } from "@/features/kuis/services/getKuisMetaDataByIdKuis";
import { formatHumanReadableTime } from "@/lib/utils";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // periksa dulu idkuis di msubskill
    let subskill = await getSubskillByIdSubskill(params.idSubSkill)
    invariant(Boolean(subskill), "Subskill not found")

    // jika tidak ada, insert tKuis
    let idKuis = subskill?.idKuis
    if (!idKuis) {
        const newKuis = await createKuis()
        idKuis = newKuis[0].idKuis
        await updateSubskill(params.idSubSkill, {
            idKuis: idKuis,
        })
    }

    // lalu return semua question berdasarkan idkuis yang didapat
    const questions = await getAllQuestionsByIdKuis(idKuis)
    const kuisMetaData = await getKuisMetaDataByIdKuis(idKuis)

    // toast
    const { headers, toast } = await getToast(request)

    return data({ questions, subskill, idKuis, toast, kuisMetaData: kuisMetaData[0] }, { headers })
}

export default function MakeKuisRoute({ loaderData, params }: Route.ComponentProps) {

    const { questions, subskill, idKuis, toast, kuisMetaData } = loaderData

    useToastEffect(toast)

    const fetcherHapusPertanyaan = useFetcher({ key: "hapus-pertanyaan" })


    return (
        <div className="flex-1 flex flex-col">
            <HeaderRoute title={(
                <div className="flex items-center gap-2">
                    <Badge className="tracking-wider text-sm">Kuis</Badge>
                    <Badge className="tracking-wider text-sm">{subskill?.skill?.namaSkill}</Badge>
                    <span>{subskill?.namaSubSkill}</span>
                </div>
            )} description={`Buat kuis untuk subskill ini`}
                actionButton={
                    <Button variant={"link"} asChild>
                        <Link to="../.." relative="path">
                            <ChevronLeftIcon />
                            Kembali
                        </Link>
                    </Button>
                }
            />

            <div className="mb-6 flex items-center justify-between gap-2 w-2/3">
                <TombolTambahSoal idKuis={idKuis} />
                <SwitchKuisLocked idKuis={idKuis} isLocked={kuisMetaData.isLocked} jumlahSoal={questions.length} />
            </div>

            <div className="flex flex-row gap-4 flex-1">
                <div className="border-4 rounded-lg border-dashed flex flex-col p-4 w-2/3">
                    {questions.length === 0 ? (
                        <BelumAdaSoal />
                    ) : (
                        <ItemGroup className="gap-4">
                            {questions.map((q, i) => (
                                <Item variant="outline" key={q.idKuisQuestion} className="hover:bg-secondary">
                                    <ItemMedia variant="icon">
                                        {i + 1}
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>{q.question}</ItemTitle>
                                        <ItemDescription>
                                            {/* Jawaban : {q.answer?.toUpperCase()} . {q?.pilihan ? JSON.parse(q.pilihan)[q.answer!] : null} */}
                                            Jawaban : {q.answerOption.toUpperCase()} . {q.correctOption?.optionDesc}
                                        </ItemDescription>
                                        <div className="flex flex-row gap-2 mt-4">
                                            <Badge variant="outline">
                                                <CalendarSyncIcon />
                                                {formatHumanReadableTime(q.updated_at)}
                                            </Badge>
                                            <Badge variant="outline">
                                                <TimerIcon />
                                                {q.waktuPengerjaanDetik} detik
                                            </Badge>
                                        </div>
                                    </ItemContent>
                                    <ItemActions>

                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="cursor-pointer"
                                            // disabled={`/app/pic-subskill/make-kuis/review/${q.idKuisQuestion}` === currentPathname}
                                            type="button"
                                            asChild
                                        >
                                            <NavLink to={`kuis/${idKuis}/question/${q.idKuisQuestion}/edit`} viewTransition>
                                                <PencilIcon />
                                                Edit
                                            </NavLink>
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="cursor-pointer"
                                            // disabled={`/app/pic-subskill/make-kuis/review/${q.idKuisQuestion}` === currentPathname}
                                            type="button"
                                            onClick={() => fetcherHapusPertanyaan.submit(null, {
                                                method: "delete",
                                                action: `kuis/${idKuis}/question/${q.idKuisQuestion}/delete`
                                            })}
                                        >
                                            <TrashIcon />
                                            Hapus
                                        </Button>
                                    </ItemActions>
                                </Item>
                            ))}
                        </ItemGroup>
                    )}
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}