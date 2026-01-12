import type { Route } from "./+types/progress";
import { getQuestionByIdKuis } from "@/features/kuis/services/pengerjaan-kuis/getQuestionByIdKuis";
import { HeaderRoute } from "@/components/header-route";
import { getIdQuestionsKuisProgress } from "@/features/kuis/services/pengerjaan-kuis/getIdQuestionsKuisProgress";
import invariant from "tiny-invariant";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { getNamaSubskillByIdKuis } from "@/features/subskill/services/getNamaSubskillByIdKuis";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shuffle } from "@/lib/utils";
import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTimerKuis } from "@/features/kuis/hooks/use-timer-kuis";
import { useSubmitCurrentJawaban } from "@/features/kuis/hooks/use-submit-current-jawaban";

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

    const { submitCurrentJawaban, fetcher } = useSubmitCurrentJawaban()
    const isSubmitting = fetcher.state !== "idle";

    // ✨ UPDATE IMPLEMENTASI HOOK
    const { timeLeft, waktuPengerjaanDetik } = useTimerKuis(
        question.idKuisQuestion,
        question.waktuPengerjaanDetik ?? 15,
        isSubmitting, // 👈 Masukkan state ini agar timer berhenti saat submit
        (elapsed) => {
            // ⏰ TIMEOUT CASE
            // Pastikan kita tidak submit double jika user baru saja klik submit manual
            if (!isSubmitting) {
                submitCurrentJawaban({
                    idKuisQuestion: question.idKuisQuestion,
                    waktuPengerjaanDetik: elapsed, // Gunakan elapsed dari callback
                    jumlahSoal,
                });
            }
        }
    );

    const handleSaveJawaban = (value: string) => {
        // Submit jawaban manual
        submitCurrentJawaban({
            idKuisQuestion: question.idKuisQuestion,
            jawaban: value,
            waktuPengerjaanDetik, // Mengirim waktu terakhir yang tercatat
            jumlahSoal,
        });
    };

    const formattedTime = `${Math.floor(timeLeft / 60).toString().padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`;




    return (
        <div className={isSubmitting ? "opacity-70 pointer-events-none" : ""}>
            <HeaderRoute title="Ujian" description={`Materi ujian berasal dari [${namaSubskill}]`} />
            <div className="max-w-5xl mx-auto space-y-8">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">Pertanyaan No. {Number(params.questionNumber)} dari {jumlahSoal} pertanyaan</p>
                        <p className="text-sm text-muted-foreground font-bold">Waktu: {formattedTime}</p>
                    </div>
                    <div>
                        <Progress className="h-1" value={timeLeft / question.waktuPengerjaanDetik! * 100} />
                    </div>
                </div>

                <Card key={params.questionNumber}>
                    <CardHeader>
                        <CardTitle>{question.question}</CardTitle>
                        {/* <CardDescription>Card Description</CardDescription>
                            <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent>
                        <RadioGroup
                            onValueChange={(value) => handleSaveJawaban(value)}
                            disabled={isSubmitting}
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