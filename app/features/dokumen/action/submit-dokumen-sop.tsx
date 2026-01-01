import { dataWithError, dataWithToast, redirectWithSuccess } from "remix-toast";
import { parseWithZod } from "@conform-to/zod/v4";
import { sopSchema } from "../schema/sop-schema";
import { parseFormData } from "@remix-run/form-data-parser";
// import { uploadHandler } from "../helper/upload-handler";
import { minio } from "@/lib/minio.server";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
import type { Route } from "./+types/submit-dokumen-sop";
import { uploadHandler } from "../helpers/upload-handler";
import { saveDokumen } from "../services/saveDokumen";
import { userContext } from "@/lib/context";
import { updateDokumen } from "../services/updateDokumen";
import { getDokumenById } from "../services/getDokumenById";

export async function action({ request, params, context }: Route.ActionArgs) {

    const user = context.get(userContext)

    try {
        // ===== File Upload Handler =====
        const { handler } = uploadHandler("file")
        const formData = await parseFormData(
            request,
            { maxFileSize: 30 * 1024 * 1024 }, //30 mb - menyebabkan cannot parse form data
            handler
        );

        const submission = parseWithZod(formData, { schema: sopSchema });
        // check if idDokumen exist then update, else insert
        const idDokumen = formData.get("idDokumen")
        const keyFile = formData.get("file")

        if (submission.status !== 'success') {
            if (keyFile) {
                await minio.deleteFile(keyFile as string)
            }
            return dataWithError(submission.reply(), "Data yang disubmit error");
        }


        if (!idDokumen) {

            await saveDokumen({
                filename: keyFile as string,
                judul: submission.value.judul,
                idSubBidang: user.idSubBidang,
                tipe: params.tipeDokumen,
                idUploader: user.idUser,
                // idTeam: params.tipeDokumen === "ik" ? "IK" : "SOP",

            })
            return redirectWithSuccess(`/app/dokumen/tipe/${params.tipeDokumen}`, `Dokumen ${submission.value.judul} berhasil disimpan`)
        } else {
            const oldDokumen = await getDokumenById(idDokumen as string)
            if (keyFile) {
                if (oldDokumen[0].filename) {
                    await minio.deleteFile(oldDokumen[0].filename)
                }
            }
            await updateDokumen({
                filename: keyFile as string ?? undefined,
                judul: submission.value.judul,
                // idTeam: params.tipeDokumen === "ik" ? "IK" : "SOP",

            }, idDokumen as string)
            return redirectWithSuccess(`/app/dokumen/tipe/${params.tipeDokumen}`, `Dokumen ${submission.value.judul} berhasil diupdate`)
        }
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);
        return dataWithError(null, message);
    }
}