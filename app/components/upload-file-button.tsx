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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileUploadField } from "@/features/dokumen/components/file-uploader"
import { useUploadFile, useUploadFiles } from "@better-upload/client"
import { FileUpIcon } from "lucide-react"
import { UploadDropzoneProgress } from "./upload-dropzone-progress"

type UploadFileButtonProp = {
    addtionalData: Record<string, any>
}

export function UploadFileButton({ addtionalData }: UploadFileButtonProp) {

    const { control } = useUploadFiles({
        route: 'dokumen',
        api: "/app/dokumen/action/upload",
        onUploadBegin: ({ files, metadata }) => {
            console.log(files, metadata)
        },


    });

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                        <FileUpIcon />
                        Upload
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload Dokumen</DialogTitle>
                        <DialogDescription>
                            Upload dokumen PDF
                        </DialogDescription>
                    </DialogHeader>
                    <UploadDropzoneProgress control={control} accept="application/pdf" />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
