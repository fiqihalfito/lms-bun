import type { Route } from "./+types/upload-dokumen";
import { handleRequest, route, type Router } from '@better-upload/server';
import { minio } from '@better-upload/server/clients';
import "dotenv/config"
import { saveDokumenWithReturn } from "../services/saveDokumenWithReturn";
import { userContext } from "@/lib/context";
import { getTeamDataFromTeamMember } from "@/features/team/services/getIdTeamFromTeamMember";

const router: Router = {
    client: minio({
        endpoint: process.env.MINIO_ENDPOINT!,
        accessKeyId: process.env.MINIO_ROOT_USER!,
        secretAccessKey: process.env.MINIO_ROOT_PASSWORD!,
        region: "auto",
    }),
    bucketName: process.env.MINIO_BUCKET!,
    routes: {
        dokumen: route({
            multipleFiles: true,
            maxFiles: 1,
            fileTypes: ['application/pdf'],
            maxFileSize: 1024 * 1024 * 20,
            onBeforeUpload: async ({ req, files, clientMetadata }) => {

                const filename = Bun.randomUUIDv7() + ".pdf"
                const key = `dokumen/${filename}`


                // // insert to tdokumen
                // const newId = await saveDokumenWithReturn({
                //     filename,
                //     judul: file.name,
                //     idSubBidang: user.idSubBidang!,
                //     tipe: "knowledge",
                //     idUploader: user.idUser,
                //     idTeam: userTeam[0].team[0].idTeam!,
                //     // idLayanan: userTeam[0].team[0].idLayanan!,
                // })

                // // insert to msubskill
                // await 

                return {
                    generateObjectInfo: ({ file }) => ({
                        key: key,
                    }),
                };
            },
        }),
    },
};

export async function action({ request, params, context }: Route.ActionArgs) {
    return handleRequest(request, router);
}