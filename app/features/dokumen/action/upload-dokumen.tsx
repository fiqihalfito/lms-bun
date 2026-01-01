import type { Route } from "./+types/upload-dokumen";
import { handleRequest, route, type Router } from '@better-upload/server';
import { minio } from '@better-upload/server/clients';
import "dotenv/config"

const router: Router = {
    client: minio({
        endpoint: process.env.MINIO_ENDPOINT!,
        accessKeyId: process.env.MINIO_ROOT_USER!,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD!,
        region: "auto",
    }),
    bucketName: process.env.MINIO_BUCKET!,
    routes: {
        dokumenx: route({
            fileTypes: ['application/pdf'],
            maxFileSize: 1024 * 1024 * 20,
        }),
    },
};

export async function action({ request, params }: Route.ActionArgs) {
    return handleRequest(request, router);
}