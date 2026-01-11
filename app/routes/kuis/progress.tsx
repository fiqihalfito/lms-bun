import type { Route } from "./+types/progress";
import { getQuestionByIdKuis } from "@/features/kuis/services/pengerjaan-kuis/getQuestionByIdKuis";
import { HeaderRoute } from "@/components/header-route";
import { getIdQuestionsKuisProgress } from "@/features/kuis/services/pengerjaan-kuis/getIdQuestionsKuisProgress";
import invariant from "tiny-invariant";
import { getToast } from "remix-toast";
import { data, useFetcher, useNavigate, useResolvedPath, useSubmit } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { getNamaSubskillByIdKuis } from "@/features/subskill/services/getNamaSubskillByIdKuis";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shuffle } from "@/lib/utils";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

export async function loader({ request, params, context }: Route.LoaderArgs) {


    const idQuestions = await getIdQuestionsKuisProgress(params.idKuisProgress)
    invariant(idQuestions.length > 0, "Tidak ada soal")
    // ambil semua soal
    const idKuisQuestion = idQuestions[Number(params.questionNumber) - 1]
    invariant(idKuisQuestion, "Soal tidak ditemukan")
    const question = await getQuestionByIdKuis(idKuisQuestion)


    invariant(question, "Soal tidak ditemukan")
    const options = shuffle(question.options)

    // accesories
    const subskill = await getNamaSubskillByIdKuis(params.idKuis)
    const namaSubskill = subskill.length > 0 ? subskill[0].namaSubSkill : ""
    const jumlahSoal = idQuestions.length

    const { toast, headers } = await getToast(request)

    return data({ question, namaSubskill, toast, jumlahSoal, options }, { headers })
}

export default function KuisRoute({ loaderData, params }: Route.ComponentProps) {

    const { question, namaSubskill, toast, jumlahSoal, options } = loaderData

    useToastEffect(toast)

    const pilihanChar = ["A", "B", "C", "D"]

    const fetcherCurrentJawaban = useFetcher({ key: "submit-current-jawaban" })
    const handleSaveJawaban = (value: string) => {

        fetcherCurrentJawaban.submit({
            idKuisQuestion: question.idKuisQuestion,
            jawaban: value,
            jumlahSoal: jumlahSoal,
        }, {
            method: "post",
            action: "submit-current-jawaban",
        })

    }


    return (
        <div>
            <HeaderRoute title="Ujian" description={`Materi ujian berasal dari [${namaSubskill}]`} />
            <div className="max-w-5xl mx-auto space-y-4">
                <p className="text-sm text-muted-foreground">Pertanyaan No. {Number(params.questionNumber)} dari {jumlahSoal} pertanyaan</p>
                <Card key={params.questionNumber}>
                    <CardHeader>
                        <CardTitle>{question.question}</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription>
                            <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={(value) => handleSaveJawaban(value)}
                        >
                            {options.map((item, i) => (
                                <FieldLabel key={item.idKuisQuestionOption} htmlFor={item.idKuisQuestionOption} className="font-normal border rounded cursor-pointer">
                                    <Field orientation="horizontal">
                                        <RadioGroupItem value={item.option} id={item.idKuisQuestionOption} />
                                        <FieldContent>
                                            <FieldTitle>
                                                {pilihanChar[i]}{". "}{item.optionDesc}
                                            </FieldTitle>
                                            {/* <FieldDescription>
                                        Run GPU workloads on a K8s configured cluster.
                                    </FieldDescription> */}
                                        </FieldContent>
                                    </Field>
                                </FieldLabel>
                            ))}
                        </RadioGroup>
                    </CardContent>
                </Card>
            </div>

            {/* <h1 className="text-2xl font-bold">{question.question}</h1> */}
            {/* <pre>{JSON.stringify(question, null, 2)}</pre> */}
        </div>
    )
}