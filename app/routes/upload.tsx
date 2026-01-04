import { handleRequest, route, type Router } from '@better-upload/server';
import { minio } from '@better-upload/server/clients';
import "dotenv/config"
import type { Route } from './+types/upload';
import { routes } from '@/lib/routes-upload/routes';

export const router: Router = {
    client: minio({
        endpoint: process.env.MINIO_ENDPOINT!,
        accessKeyId: process.env.MINIO_ROOT_USER!,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD!,
        region: "auto",
    }),
    bucketName: process.env.MINIO_BUCKET!,
    routes: routes

};

export async function action({ request, params, context }: Route.ActionArgs) {
    return handleRequest(request, router);
}