import { getSubskillByIdSubskill } from "@/features/subskill/services/getSubskillByIdSubSkill";
import type { Route } from "./+types/make-kuis";
import invariant from "tiny-invariant";
import { createKuis } from "@/features/kuis/services/createKuis";
import { getQuestionsByIdKuis } from "@/features/kuis/services/getQuestionsByIdKuis";
import { HeaderRoute } from "@/components/header-route";
import { updateSubskill } from "@/features/subskill/services/updateSubskill";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon, CircleOffIcon, PlusIcon } from "lucide-react";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
import { NavLink, Outlet } from "react-router";
import { BelumAdaSoal } from "@/features/kuis/components/make-kuis/BelumAdaSoal";

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
    const questions = await getQuestionsByIdKuis(idKuis)

    return { questions, subskill, idKuis }
}

export default function MakeKuisRoute({ loaderData, params }: Route.ComponentProps) {

    const { questions, subskill, idKuis } = loaderData

    return (
        <div>
            <HeaderRoute title={(
                <div className="flex items-center gap-2">
                    <Badge className="tracking-wider text-sm">Kuis</Badge>
                    <Badge className="tracking-wider text-sm">{subskill?.skill?.namaSkill}</Badge>
                    <span>{subskill?.namaSubSkill}</span>
                </div>
            )} description={`Buat kuis untuk subskill ini`}

            />

            <div className="mb-6">
                <Button size={"lg"} asChild>
                    <NavLink to={`kuis/${idKuis}/add-question`} viewTransition>
                        <PlusIcon />
                        Tambah Soal
                    </NavLink>
                </Button>
            </div>

            {/* ambil list questions di github */}
            <div className="grid grid-cols-2 gap-x-4 h-full">
                <div className="border-4 rounded-lg border-dashed flex flex-col p-4">
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
                                            Jawaban :
                                        </ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="cursor-pointer"
                                            // disabled={`/app/pic-subskill/make-kuis/review/${q.idKuisQuestion}` === currentPathname}
                                            type="button"
                                        >
                                            <NavLink to={`review/${q.idKuisQuestion}`} viewTransition>
                                                {({ isPending, isActive }) => (
                                                    <span className="flex items-center">
                                                        {isActive ? (
                                                            <>
                                                                Sedang direview
                                                                <ChevronRightIcon />
                                                            </>
                                                        ) : (
                                                            "Review"
                                                        )}
                                                    </span>
                                                )}
                                            </NavLink>
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