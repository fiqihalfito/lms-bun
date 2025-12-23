import { minio } from "@/lib/minio.server"
import type { FileUpload, FileUploadHandler } from "@remix-run/form-data-parser"

export function uploadHandler(fieldName: string) {
    let key: string | undefined
    const handler: FileUploadHandler = async (fileUpload: FileUpload) => {
        if (fileUpload.fieldName === fieldName) {
            const key = await minio.uploadFile(fileUpload)
            return key
        }
    }
    return { handler, key }
}