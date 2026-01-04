import type { AcceptMimeType } from "@/types/upload-accept";
import { route } from "@better-upload/server";

export const routes = {
    dokumen: route({
        // multipleFiles: true,
        // maxFiles: 10,
        multipart: true,
        fileTypes: ['application/pdf'] as AcceptMimeType[],
        maxFileSize: 1024 * 1024 * 20,
        onBeforeUpload: async ({ req, file, clientMetadata }) => {

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

            return {
                // ====== this for multiple files ======
                // generateObjectInfo: ({ file }) => {
                //     const filename = Bun.randomUUIDv7() + ".pdf"
                //     const key = `dokumen/${filename}`
                //     return {
                //         key: key,
                //     }
                // }
                // ====== end multiple files ======
                // ====== this for single file ======
                objectInfo: {
                    key: key,
                }
                // ====== end single file ======
            };
        },
    }),
}
