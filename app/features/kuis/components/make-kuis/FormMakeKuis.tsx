import { Select } from "@/components/select-custom";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getFormProps, getInputProps, getTextareaProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { Form, useFetcher } from "react-router";
import { makeKuisSchema } from "@/features/kuis/schema/makeKuisSchema";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { getQuestionByIdKuisQuestion } from "../../services/getQuestionByIdQuestion";
import type z from "zod";
import React from "react";

type FormMakeKuisProp = {
    defaultValues?: z.infer<typeof makeKuisSchema> & { idKuisQuestion: string };
    actionUrl: string
}

export function FormMakeKuis({ defaultValues, actionUrl }: FormMakeKuisProp) {

    const fetcher = useFetcher()

    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: makeKuisSchema });
        },

        constraint: getZodConstraint(makeKuisSchema),

        defaultValue: defaultValues,
        onSubmit(event, { formData, submission, action, method }) {
            event.preventDefault()

            if (defaultValues?.idKuisQuestion) {
                formData.append("idKuisQuestion", defaultValues.idKuisQuestion)
            }

            fetcher.submit(formData, {
                method: method,
                action: action,
                relative: "path",
            })

        },


        // Validate the form on blur event triggered
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    const optionChar = ["a", "b", "c", "d"] as const
    const options = fields.options.getFieldset();

    let submitting = fetcher.state !== "idle"

    return (
        <fetcher.Form
            {...getFormProps(form)}
            method="post"
            action={actionUrl}
            relative="path"
            className="flex flex-col gap-6 border shadow rounded-md p-6 w-1/3 mx-auto"
        >
            <FieldSet>
                <Field>
                    <FieldLabel htmlFor="soal">
                        Soal
                    </FieldLabel>

                    <Textarea
                        {...getTextareaProps(fields.question)}
                        placeholder="Masukkan soal"
                    />
                    <FieldError id={fields.question.id}>{fields.question.errors}</FieldError>
                </Field>

                <FieldGroup>

                    <Field>
                        <FieldLabel>
                            Pilihan ganda
                        </FieldLabel>
                        {optionChar.map((o, i) => (
                            <React.Fragment key={i}>
                                <ButtonGroup>
                                    <ButtonGroupText asChild>
                                        <Label htmlFor={options[o].id}>{o.toUpperCase()}</Label>
                                    </ButtonGroupText>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...getInputProps(options[o], { type: "text" })}
                                            placeholder={`Pilihan ${o.toUpperCase()}`}
                                        />
                                    </InputGroup>
                                </ButtonGroup>
                                <FieldError className="-mt-2">{options[o].errors}</FieldError>
                            </React.Fragment>

                        ))}
                    </Field>
                    <Field className="w-1/2">
                        <FieldLabel>
                            Jawaban Benar
                        </FieldLabel>
                        <Select
                            name={fields.answerOption.name}
                            placeholder="jawaban"
                            items={optionChar.map((o) => ({
                                value: o,
                                name: o.toUpperCase(),
                            }))}
                            id={fields.answerOption.id}
                            defaultValue={fields.answerOption.defaultValue}
                            label="Jawaban Benar"
                            fetcherState="idle" // tambahkan idle kalau sumber data bukan fetcher
                        />
                        <FieldError id={fields.answerOption.id}>{fields.answerOption.errors}</FieldError>
                    </Field>
                </FieldGroup>
                <Field>
                    <Button type="submit" disabled={submitting}>
                        {submitting && <Spinner />}
                        {submitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                </Field>
            </FieldSet>
        </fetcher.Form>
    )
}