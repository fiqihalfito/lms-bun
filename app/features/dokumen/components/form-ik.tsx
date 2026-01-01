import { parseWithZod } from "@conform-to/zod/v4";
import { useFetcher, type Form } from "react-router";
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
import { getFormProps, getInputProps, getSelectProps, useForm } from "@conform-to/react"
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
import { ikSchema } from "../schema/ik-schema";
import type { loader as loaderLayanan } from "../../layanan/loaders/get-layanan-all";
import type { loader as loaderTeam } from "../../team/loaders/get-team-all";
import { Select } from "@/components/select-custom";
// import { usePresignedUploader } from "../hooks/use-presignedUploader";

type FormIKprop = {
    // mode: "insert" | "update",
    dv?: Awaited<ReturnType<typeof getDokumenById>>[number]
} & React.ComponentProps<typeof Form>

export function FormIK({
    dv,
    className,
    ...props
}: FormIKprop) {


    const file = useFiles();

    const fetcher = useFetcher({ key: "form-ik" });
    const fetcherSelectLayanan = useFetcher<typeof loaderLayanan>({ key: "select-layanan" });
    const fetcherSelectTeam = useFetcher<typeof loaderTeam>({ key: "select-team" });
    // const { uploadHandler, isUploading, keyFile } = usePresignedUploader();


    const [form, fields] = useForm({
        // Sync the result of last submission from action fetcher
        lastResult: fetcher.state === 'idle' ? fetcher.data : null,

        // Reuse the validation logic on the client
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: ikSchema });
        },
        // constraint: getZodConstraint(sopSchema),

        defaultValue: dv,
        onSubmit(event, { formData, submission, action, encType, method }) {
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
                method: method,
                action: action,
                encType: encType,
            })

        },

        // Validate the form on blur event triggered
        // shouldValidate: 'onBlur',
        // shouldRevalidate: 'onInput',
    });


    let submitting = fetcher.state !== "idle"


    const tipeDokumen = "ik"
    return (
        <fetcher.Form
            {...getFormProps(form)}
            method="post"
            action={`/app/dokumen/action/tipe/${tipeDokumen}/submit-ik`}
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
                        <FieldLabel htmlFor={fields.idLayanan.id}>Layanan</FieldLabel>
                        <Select
                            id={fields.idLayanan.id}
                            name={fields.idLayanan.name}
                            defaultValue={fields.idLayanan.defaultValue}
                            placeholder="Pilih Layanan"
                            label="Layanan"
                            items={fetcherSelectLayanan.data?.layanan.map((layanan) => ({
                                value: layanan.idLayanan,
                                name: layanan.namaLayanan,
                            })) ?? []}
                            fetcherState={fetcherSelectLayanan.state}
                            loadItems={() => fetcherSelectLayanan.load("/app/resources/layanan/get-layanan-all")}
                        />
                        {fetcherSelectLayanan.state === "loading" && (
                            <FieldDescription className="flex items-center gap-2">
                                <Spinner /> <span>Memuat Layanan...</span>
                            </FieldDescription>
                        )}
                        <FieldError id={fields.idLayanan.errorId}>{fields.idLayanan.errors}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={fields.idTeam.id}>Team</FieldLabel>
                        <Select
                            id={fields.idTeam.id}
                            name={fields.idTeam.name}
                            defaultValue={fields.idTeam.defaultValue}
                            placeholder="Pilih Team"
                            label="Team"
                            items={fetcherSelectTeam.data?.teams.map((team) => ({
                                value: team.idTeam,
                                name: team.namaTeam,
                            })) ?? []}
                            fetcherState={fetcherSelectTeam.state}
                            loadItems={() => fetcherSelectTeam.load("/app/resources/team/get-team-all")}
                        />
                        {fetcherSelectTeam.state === "loading" && (
                            <FieldDescription className="flex items-center gap-2">
                                <Spinner /> <span>Memuat Team...</span>
                            </FieldDescription>
                        )}
                        <FieldError id={fields.idTeam.errorId}>{fields.idTeam.errors}</FieldError>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor={"upload-dokumen-ik"}>upload dokumen</FieldLabel>

                        <FileUploadField
                            value={file.files}
                            onChange={file.onChangeFile}
                            onReject={file.onRejectFile}
                            accept=".pdf"
                            maxFiles={1}
                            maxSize={30 * 1024 * 1024}
                            required
                        />
                        {dv?.filename && (
                            <FieldDescription>
                                filename: {getFilenameFromMinio(dv?.filename)}
                            </FieldDescription>
                        )}
                        <FieldError id={"fileErrorIk"}>{file.fileError}</FieldError>
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