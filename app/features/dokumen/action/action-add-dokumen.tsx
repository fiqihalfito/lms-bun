import { dataWithError, dataWithToast, redirectWithSuccess } from "remix-toast";
import { parseWithZod } from "@conform-to/zod/v4";
import { sopSchema } from "../schema/sop-schema";
import { parseFormData } from "@remix-run/form-data-parser";
// import { uploadHandler } from "../helper/upload-handler";
import { minio } from "@/lib/minio.server";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
import type { Route } from "./+types/action-add-dokumen";
import { uploadHandler } from "../helper/upload-handler";
import { saveDokumen } from "../services/saveDokumen";
import { userContext } from "@/lib/context";

export async function action({ request, params, context }: Route.ActionArgs) {

    const user = context.get(userContext)

    try {
        const { handler, key } = uploadHandler("file")
        const formData = await parseFormData(
            request,
            // { maxFileSize: 5 * 1024 * 1024 }, //10 mb
            handler
        );

        const submission = parseWithZod(formData, { schema: sopSchema("server") });
        if (submission.status !== 'success') {
            if (key) {
                await minio.deleteFile(key)
            }
            return dataWithError(submission.reply(), "Data yang disubmit error");
        }


        const newDokumen = await saveDokumen({
            filename: submission.value.file as string,
            judul: submission.value.judul,
            idSubBidang: user.idSubBidang,
            tipe: params.tipeDokumen,
            idUploader: user.idUser,
            // idTeam: params.tipeDokumen === "ik" ? "IK" : "SOP",

        })
        return redirectWithSuccess(`/app/dokumen/tipe/${params.tipeDokumen}`, `Dokumen ${submission.value.judul} berhasil diupload`)
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);
        return dataWithError(null, message);
    }
}