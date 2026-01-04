import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/update-subskill";
import { dataWithError, dataWithSuccess } from "remix-toast";
import { dokumenInsertSchema } from "@/features/dokumen/schema/dokumenInsertSchema";
import { userContext } from "@/lib/context";
import { getIdTeamByIdUser } from "@/features/team/services/getIdTeamByIdUser";
import { saveDokumenWithReturn } from "@/features/dokumen/services/saveDokumenWithReturn";
import { updateSubskill } from "../services/updateSubskill";

export async function action({ request, params, context }: Route.ActionArgs) {

    const user = context.get(userContext)
    const formData = await request.formData()
    const submissionDokumen = parseWithZod(formData, { schema: dokumenInsertSchema })

    if (submissionDokumen.status !== 'success') {
        return dataWithError(submissionDokumen.reply(), "Data yang disubmit error");
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