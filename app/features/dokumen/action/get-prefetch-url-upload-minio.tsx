import { minioConnect } from "@/lib/minio.server/connect";
import type { Route } from "./+types/get-prefetch-url-upload-minio";

export async function action({ request, params }: Route.ActionArgs) {

    const filename = Bun.randomUUIDv7() + ".pdf"
    const generatedKey = `temp/${filename}`
    const uploadUrl = minioConnect.presign(generatedKey, {
        expiresIn: 3600, // 1 hour
        method: "PUT",
        type: "application/pdf", // No extension for inferring, so we can specify the content type to be JSON
    });

    return { uploadUrl, generatedKey }
}