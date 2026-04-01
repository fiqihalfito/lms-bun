import { useFetcher, type Form } from "react-router"
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod/v4";
import { cn } from "@/lib/utils";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import type { getLayananById } from "../../services/master/getLayananByid";
import { layananSchema } from "../../schema/layanan-schema";

type FormLayananprop = {
    // mode: "insert" | "update",
    dv?: Awaited<ReturnType<typeof getLayananById>>[number]
} & React.ComponentProps<typeof Form>


export function FormLayanan({ dv, className, ...props }: FormLayananprop) {

    const fetcher = useFetcher({ key: "form-layanan" })

    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: layananSchema });
        },
        // constraint: getZodConstraint(userProfilSchema),

        defaultValue: {
            namaLayanan: dv?.namaLayanan,
        },
        onSubmit(event, { formData, submission, action, method }) {
            event.preventDefault();

            // if update append idDokumen, if insert skip
            if (dv?.idLayanan) {
                formData.append("idLayanan", dv.idLayanan);
            }

            fetcher.submit(formData, {
                method: method,
                action: action,
            })

        },

        // Validate the form on blur event triggered
        // shouldValidate: 'onBlur',
        // shouldRevalidate: 'onInput',
    });

    let submitting = fetcher.state !== "idle"
    // const userAccount = fields.userAccount.getFieldset();

    return (
        <fetcher.Form
            {...getFormProps(form)}
            method="post"
            action={`/app/master/layanan/action/submit-layanan`}
            className={cn("flex flex-col gap-6 border shadow rounded-md p-6 w-1/3 mx-auto", className)}
            {...props}
        >
            <FieldSet>
                <FieldLegend className="text-center">
                    {dv?.idLayanan ? "Update Layanan" : "Tambah Layanan"}
                </FieldLegend>
                <FieldGroup>
                    <FieldError id={form.errorId}>{form.errors}</FieldError>
                    <Field>
                        <FieldLabel htmlFor={fields.namaLayanan.id}>Nama Layanan</FieldLabel>
                        <Input
                            {...getInputProps(fields.namaLayanan, { type: "text" })}
                            placeholder="Nama Layanan"
                        />
                        <FieldError id={fields.namaLayanan.errorId}>{fields.namaLayanan.errors}</FieldError>
                    </Field>
                </FieldGroup>

                <Field>
                    <Button type="submit" disabled={submitting}>
                        {submitting && <Spinner />}
                        {submitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                </Field>
                {/* <FieldSeparator>Or continue with</FieldSeparator> */}

            </FieldSet>
        </fetcher.Form>
    )
}