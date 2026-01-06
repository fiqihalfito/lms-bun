import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/update-subskill-iddokumen";
import { dataWithError, dataWithSuccess } from "remix-toast";
import { dokumenInsertSchema } from "@/features/dokumen/schema/dokumenInsertSchema";
import { userContext } from "@/lib/context";
import { getIdTeamByIdUser } from "@/features/team/services/getIdTeamByIdUser";
import { saveDokumenWithReturn } from "@/features/dokumen/services/saveDokumenWithReturn";
import { updateSubskill } from "../services/updateSubskill";
import { getIdDokumenByIdSubSkill } from "../services/getIdDokumenByIdSubSkill";
import { getDokumenFilenameById } from "@/features/dokumen/services/getDokumenFilenameById";
import { minio } from "@/lib/minio.server";

export async function action({ request, params, context }: Route.ActionArgs) {

    const user = context.get(userContext)
    const formData = await request.formData()
    const submissionDokumen = parseWithZod(formData, { schema: dokumenInsertSchema })

    if (submissionDokumen.status !== 'success') {
        return dataWithError(submissionDokumen.reply(), "Data yang disubmit error");
    }

    // ========== Success Section ============
    // delete old dokumen if exists
    const oldIdDokumen = await getIdDokumenByIdSubSkill(params.idSubSkill)
    if (oldIdDokumen) {
        const filename = await getDokumenFilenameById(oldIdDokumen)
        if (filename) {
            await minio.deleteFile(filename)
        }
    }

    const idTeam = await getIdTeamByIdUser(user.idUser)
    if (Boolean(submissionDokumen.value.filename)) {
        const newDokumen = await saveDokumenWithReturn({
            filename: submissionDokumen.value.filename,
            judul: submissionDokumen.value.judul,
            tipe: submissionDokumen.value.tipe,
            idSubBidang: user.idSubBidang,
            idTeam: idTeam,
            idUploader: user.idUser,
        })

        await updateSubskill(params.idSubSkill, {
            idDokumen: newDokumen[0].idDokumen,
        })

        // return { success: true }

        return dataWithSuccess({ ok: true }, "Dokumen berhasil disimpan")

    }

    // if there is key then insert to dokumen, get returned iddokumen, then update subskill


}