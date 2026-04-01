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
import type { getTeamsAll } from "../../services/get-teams-all";
import { teamSchema } from "../../schema/teams-schema";

type FormTeamprop = {
    // mode: "insert" | "update",
    dv?: Awaited<ReturnType<typeof getTeamsAll>>[number]
} & React.ComponentProps<typeof Form>


export function FormTeam({ dv, className, ...props }: FormTeamprop) {

    const fetcher = useFetcher({ key: "form-team" });

    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: teamSchema });
        },
        // constraint: getZodConstraint(userProfilSchema),

        defaultValue: {
            namaTeam: dv?.namaTeam,
        },
        onSubmit(event, { formData, submission, action, method }) {
            event.preventDefault();

            // if update append idDokumen, if insert skip
            if (dv?.idTeam) {
                formData.append("idTeam", dv.idTeam);
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
            action={`/app/master/team/action/submit-team`}
            className={cn("flex flex-col gap-6 border shadow rounded-md p-6 w-1/3 mx-auto", className)}
            {...props}
        >
            <FieldSet>
                <FieldLegend className="text-center">
                    {dv?.idTeam ? "Update Team" : "Tambah Team"}
                </FieldLegend>
                <FieldGroup>
                    <FieldError id={form.errorId}>{form.errors}</FieldError>
                    <Field>
                        <FieldLabel htmlFor={fields.namaTeam.id}>Nama Team</FieldLabel>
                        <Input
                            {...getInputProps(fields.namaTeam, { type: "text" })}
                            placeholder="Nama Team"
                        />
                        <FieldError id={fields.namaTeam.errorId}>{fields.namaTeam.errors}</FieldError>
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