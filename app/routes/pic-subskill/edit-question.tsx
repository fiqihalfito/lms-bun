import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/edit-question";
import { Badge } from "@/components/ui/badge";
import { getSubskillByIdSubskill } from "@/features/subskill/services/getSubskillByIdSubSkill";
import invariant from "tiny-invariant";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { FormMakeKuis } from "@/features/kuis/components/make-kuis/FormMakeKuis";
import { getQuestionByIdKuisQuestion } from "@/features/kuis/services/getQuestionByIdQuestion";
import { getOptionsByIdKuisQuestion } from "@/features/kuis/services/getOptionsByIdKuisQuestion";
import { getOptionDesc } from "@/features/kuis/lib/helper/getOptionDesc";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const subskill = await getSubskillByIdSubskill(params.idSubSkill)
    invariant(Boolean(subskill), "Subskill not found")

    // for default values
    const question = await getQuestionByIdKuisQuestion(params.idKuisQuestion)
    invariant(question.length > 0, "Question not found")

    const options = await getOptionsByIdKuisQuestion(params.idKuisQuestion)

    return { subskill, question, options }
}

export default function EditQuestionRoute({ loaderData, params }: Route.ComponentProps) {

    const { subskill, question, options } = loaderData

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
            } description="Edit soal"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />

            <FormMakeKuis defaultValues={{
                question: question[0].question,
                answerOption: question[0].answerOption as "a" | "b" | "c" | "d",
                // options: {
                //     a: getOptionDesc("a", options) || "",
                //     b: getOptionDesc("b", options) || "",
                //     c: getOptionDesc("c", options) || "",
                //     d: getOptionDesc("d", options) || "",
                // },
                options: Object.fromEntries(
                    options.map(option => [
                        option.option as "a" | "b" | "c" | "d",
                        option.optionDesc,
                    ])
                ) as { a: string; b: string; c: string; d: string },
                idKuisQuestion: params.idKuisQuestion,
                waktuPengerjaanDetik: Number(question[0].waktuPengerjaanDetik) ?? 15,
            }}
                actionUrl={`/app/pic-subskill/skill/${params.idSkill}/subskill/${params.idSubSkill}/make-kuis/kuis/${params.idKuis}/submit`}
            />

        </div>
    )
}