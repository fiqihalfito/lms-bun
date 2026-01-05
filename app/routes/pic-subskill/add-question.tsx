import { HeaderRoute } from "@/components/header-route";
import { FormMakeKuis } from "@/features/kuis/components/make-kuis/FormMakeKuis";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import type { Route } from "./+types/add-question";
import { getSubskillByIdSubskill } from "@/features/subskill/services/getSubskillByIdSubSkill";
import invariant from "tiny-invariant";
import { Badge } from "@/components/ui/badge";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const subskill = await getSubskillByIdSubskill(params.idSubSkill)
    invariant(Boolean(subskill), "Subskill not found")

    return { subskill }
}


export default function AddQuestionRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskill } = loaderData
    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title={
                (
                    <div className="flex items-center gap-2">
                        <Badge className="tracking-wider text-sm">{subskill?.skill?.namaSkill}</Badge>
                        <span>{subskill?.namaSubSkill}</span>
                    </div>
                )
            } description="Tambah soal baru"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />

            {/* action taruh di parent component supaya ambil param route nya */}
            <FormMakeKuis actionUrl={`/app/pic-subskill/skill/${params.idSkill}/subskill/${params.idSubSkill}/make-kuis/kuis/${params.idKuis}/submit`} />
        </div>
    )
}