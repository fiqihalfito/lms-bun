import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUploadFiles } from "@better-upload/client"
import { FileUpIcon } from "lucide-react"
import { UploadDropzoneProgress } from "@/components/upload-dropzone-progress"
import { useFetcher } from "react-router"
import { type DokumenInsertSchemaProp } from "@/features/dokumen/schema/dokumenInsertSchema"
import { useEffect, useState } from "react"

type UploadDokumenDirectButtonProp = {
    idSubSkill: string,
    namaSubSkill: string,
    idDokumen?: string | null
}

export function UploadDokumenDirectButton({ idSubSkill, namaSubSkill, idDokumen }: UploadDokumenDirectButtonProp) {

    const fetcher = useFetcher()
    const [open, setOpen] = useState(false)

    const { control, error, } = useUploadFiles({
        route: "dokumen",
        api: "/app/api/upload",
        onUploadComplete: ({ files, failedFiles, metadata }) => {
            fetcher.submit({
                filename: files[0].objectInfo.key,
                judul: namaSubSkill,
                tipe: "knowledge",
            } satisfies DokumenInsertSchemaProp, {
                method: "POST",
                action: `/app/pic-subskill/action/${idSubSkill}/update-subskill-iddokumen`,
            })
        }
    });

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.ok) {
            setOpen(false)
        }
    }, [fetcher.state, fetcher.data])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="sm">
                    <FileUpIcon />
                    {idDokumen ? "Reupload" : "Upload"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Dokumen</DialogTitle>
                    <DialogDescription>
                        Upload dokumen PDF
                    </DialogDescription>
                </DialogHeader>
                <UploadDropzoneProgress control={control} accept={"application/pdf"} description={{
                    maxFiles: 10,
                    maxFileSize: '30MB',
                    fileTypes: 'PDF',
                }} />
                {error && <pre className="text-red-500">{error.message}</pre>}
                {/* <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}
