import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/update-subskill-iddokumen";
import { dataWithError, dataWithSuccess } from "remix-toast";
import { dokumenInsertSchema } from "@/features/dokumen/schema/dokumenInsertSchema";
import { userContext } from "@/lib/context";
import { DokumenService } from "@/features/dokumen/services/DokumenService";
import { SubskillService } from "../services/SubskillService";
import { StorageService } from "@/features/storage/service/StorageService";
import { TeamService } from "@/features/team/services/TeamService";

export async function action({ request, params, context }: Route.ActionArgs) {
  const user = context.get(userContext);
  const formData = await request.formData();
  const submissionDokumen = parseWithZod(formData, {
    schema: dokumenInsertSchema,
  });

  if (submissionDokumen.status !== "success") {
    return dataWithError(submissionDokumen.reply(), "Data yang disubmit error");
  }

  // ========== Success Section ============
  // delete old dokumen if exists
  const oldIdDokumen = await SubskillService.getIdDokumenByIdSubSkill(
    params.idSubSkill,
  );
  if (oldIdDokumen) {
    const filename = await DokumenService.getDokumenFilenameById(oldIdDokumen);
    if (filename) {
      await StorageService.deleteFile(filename);
    }
  }

  const idTeam = await TeamService.getIdTeamByIdUser(user.idUser);
  if (Boolean(submissionDokumen.value.filename)) {
    const idDokumen = await DokumenService.saveDokumen(
      {
        filename: submissionDokumen.value.filename,
        judul: submissionDokumen.value.judul,
        tipe: submissionDokumen.value.tipe,
        idSubBidang: user.idSubBidang,
        idTeam: idTeam,
        idUploader: user.idUser,
      },
      true,
    );

    await SubskillService.editSubskill(params.idSubSkill, {
      idDokumen: idDokumen,
    });

    // return { success: true }

    return dataWithSuccess({ ok: true }, "Dokumen berhasil disimpan");
  }

  // if there is key then insert to dokumen, get returned iddokumen, then update subskill
}
