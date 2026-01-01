import { parseWithZod } from "@conform-to/zod/v4";
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
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getFormProps, getInputProps, useForm } from "@conform-to/react"
// import {
//     FileUpload,
//     FileUploadDropzone,
//     FileUploadItem,
//     FileUploadItemDelete,
//     FileUploadItemMetadata,
//     FileUploadItemPreview,
//     FileUploadItemProgress,
//     FileUploadList,
//     type FileUploadProps,
//     FileUploadTrigger,
// } from "@/components/ui/file-upload";
import { useFiles } from "../hooks/use-files";
import { FileUploadField } from "./file-uploader";
import { Spinner } from "@/components/ui/spinner";
import type { getDokumenById } from "../services/getDokumenById";
import { getFilenameFromMinio } from "../helpers/getFilenameFromMinio";
// import { usePresignedUploader } from "../hooks/use-presignedUploader";

type FormSOPprop = {
    // mode: "insert" | "update",
    dv?: Awaited<ReturnType<typeof getDokumenById>>[number]
} & React.ComponentProps<typeof Form>

export function FormSOP({
    dv,
    className,
    ...props
}: FormSOPprop) {


    const file = useFiles();

    const fetcher = useFetcher({ key: "form-sop" });
    // const { uploadHandler, isUploading, keyFile } = usePresignedUploader();


    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: sopSchema });
        },
        // constraint: getZodConstraint(sopSchema),

        defaultValue: dv,
        onSubmit(event, { formData, submission }) {
            event.preventDefault();

            if (file.files.length === 0 && !dv?.filename) {
                file.setFileError("File belum diupload")
                return
            }

            if (file.files.length > 0) {
                formData.append("file", file.files[0]);
            }
            // if update append idDokumen, if insert skip
            if (dv?.idDokumen) {
                formData.append("idDokumen", dv.idDokumen);
            }

            fetcher.submit(formData, {
                method: "post",
                action: `/app/dokumen/action/tipe/${tipeDokumen}/submit`,
                encType: "multipart/form-data",
            })

        },

        // Validate the form on blur event triggered
        // shouldValidate: 'onBlur',
        // shouldRevalidate: 'onInput',
    });


    let submitting = fetcher.state !== "idle"


    const tipeDokumen = "sop"
    return (
        <fetcher.Form
            {...getFormProps(form)}
            method="post"
            action={`/app/dokumen/action/tipe/${tipeDokumen}/submit`}
            encType="multipart/form-data"
            className={cn("flex flex-col gap-6 border shadow rounded-md p-6 w-1/3 mx-auto", className)}
            {...props}
        >
            <FieldSet>
                <FieldLegend className="text-center">
                    {dv?.idDokumen ? "Update Dokumen" : "Tambah Dokumen"}
                </FieldLegend>
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
                        <FieldLabel htmlFor={"upload-dokumen"}>upload dokumen</FieldLabel>
                        {/* <Input
                            {...getInputProps(fields.file, { type: "file", accept: "application/pdf" })}
                            placeholder="Upload file"
                        /> */}
                        {/* <Uploader /> */}
                        <FileUploadField
                            value={file.files}
                            onChange={file.onChangeFile}
                            onReject={file.onRejectFile}
                            // onUpload={uploadHandler}
                            accept=".pdf"
                            maxFiles={1}
                            maxSize={30 * 1024 * 1024}
                            required
                        // keyFile={keyFile}
                        />
                        {dv?.filename && (
                            <FieldDescription>
                                filename: {getFilenameFromMinio(dv?.filename)}
                            </FieldDescription>
                        )}
                        {/* <FieldError id={fields.file.errorId}>{fields.file.errors}</FieldError> */}
                        <FieldError id={"fileError"}>{file.fileError}</FieldError>
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