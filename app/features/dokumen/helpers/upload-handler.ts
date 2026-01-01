import { minio } from "@/lib/minio.server"
import type { FileUpload, FileUploadHandler } from "@remix-run/form-data-parser"

export function uploadHandler(fieldName: string) {
    const handler: FileUploadHandler = async (fileUpload: FileUpload) => {
        if (fileUpload.fieldName === fieldName) {
            const key = await minio.uploadFile(fileUpload)
            return key
        }
    }
    return { handler }
}