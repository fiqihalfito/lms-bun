import { dataWithError, dataWithToast, redirectWithSuccess } from "remix-toast";
import { parseWithZod } from "@conform-to/zod/v4";
import { parseFormData } from "@remix-run/form-data-parser";
import { minio } from "@/lib/minio.server";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
import type { Route } from "./+types/submit-dokumen-ik";
import { uploadHandler } from "../helpers/upload-handler";
import { saveDokumen } from "../services/saveDokumen";
import { userContext } from "@/lib/context";
import { updateDokumen } from "../services/updateDokumen";
import { getDokumenById } from "../services/getDokumenById";
import { ikSchema } from "../schema/ik-schema";

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

        const submission = parseWithZod(formData, { schema: ikSchema });
        // check if idDokumen exist then update, else insert
        const idDokumen = formData.get("idDokumen")
        const keyFile = formData.get("file")

        if (submission.status !== 'success') {
            if (keyFile) {
                await minio.deleteFile(keyFile as string)
            }
            return dataWithError(submission.reply(), "Data yang disubmit error");
        }

        // const userTeamData = await getTeamDataFromTeamMember(user.idUser)

        if (!idDokumen) {

            await saveDokumen({
                filename: keyFile as string,
                judul: submission.value.judul,
                idSubBidang: user.idSubBidang,
                tipe: params.tipeDokumen,
                idUploader: user.idUser,
                idTeam: submission.value.idTeam,
                idLayanan: submission.value.idLayanan,

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
                idTeam: submission.value.idTeam,
                idLayanan: submission.value.idLayanan,

            }, idDokumen as string)
            return redirectWithSuccess(`/app/dokumen/tipe/${params.tipeDokumen}`, `Dokumen ${submission.value.judul} berhasil diupdate`)
        }
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);
        return dataWithError(null, message);
    }
}