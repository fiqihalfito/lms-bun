import { getZodConstraint, parseWithZod } from "@conform-to/zod/v4";
import { useFetcher, type Form } from "react-router";
import { sopSchema } from "../schema/sop-schema";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadItem,
    FileUploadItemDelete,
    FileUploadItemMetadata,
    FileUploadItemPreview,
    FileUploadItemProgress,
    FileUploadList,
    type FileUploadProps,
    FileUploadTrigger,
} from "@/components/ui/file-upload";

type FormSOPprop = {
    // mode: "insert" | "update",
} & React.ComponentProps<typeof Form>

export function FormSOP({
    // mode,
    className,
    ...props
}: FormSOPprop) {
    const fetcher = useFetcher({ key: "form-sop" });

    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: sopSchema("client") });
        },
        // constraint: getZodConstraint(sopSchema),

        defaultValue: {
            // judul: ""
        }

        // Validate the form on blur event triggered
        // shouldValidate: 'onBlur',
        // shouldRevalidate: 'onInput',
    });

    const tipeDokumen = "sop"
    return (
        <fetcher.Form
            method="post"
            action={`/app/dokumen/action/tipe/${tipeDokumen}/add`}
            {...getFormProps(form)}
            encType="multipart/form-data"
            className={cn("flex flex-col gap-6 border shadow rounded-md p-6 w-1/3 mx-auto", className)}
            {...props}
        >
            <FieldSet>
                <FieldLegend className="text-center">Tambah Dokumen</FieldLegend>
                <FieldGroup>
                    <FieldError id={form.errorId}>{form.errors}</FieldError>
                    <Field>
                        <FieldLabel htmlFor={fields.judul.id}>Judul Dokumen</FieldLabel>
                        <Input
                            {...getInputProps(fields.judul, { type: "text" })}
                            placeholder="Judul Dokumen"
                        />
                        <FieldError id={fields.judul.errorId}>{fields.judul.errors}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={fields.file.id}>upload dokumen</FieldLabel>
                        <Input
                            {...getInputProps(fields.file, { type: "file", accept: "application/pdf" })}
                            placeholder="Upload file"
                        />
                        {/* {idDokumen && (
                            <FieldDescription>
                                filename: {dv?.filename}
                            </FieldDescription>
                        )} */}
                        <FieldError id={fields.file.errorId}>{fields.file.errors}</FieldError>
                    </Field>
                </FieldGroup>

                <Field>
                    <Button type="submit">Login</Button>
                </Field>
                {/* <FieldSeparator>Or continue with</FieldSeparator> */}

            </FieldSet>
        </fetcher.Form>
    )
}