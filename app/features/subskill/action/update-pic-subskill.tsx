import type { Route } from "./+types/update-pic-subskill";
import { parseWithZod } from "@conform-to/zod/v4";
import { updatePicSubskillSchema } from "../schema/updatePicSubskillSchema";
import { dataWithError, dataWithSuccess } from "remix-toast";
import { SubskillService } from "../services/SubskillService";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData();
    const submission = parseWithZod(formData, { schema: updatePicSubskillSchema });

    if (submission.status !== 'success') {
        return dataWithError(submission.reply(), "Gagal update PIC");
    }

    try {
        await SubskillService.editSubskill(params.idSubSkill, {
            idPic: submission.value.idPic,
        });
        return dataWithSuccess({ success: true }, "Berhasil update PIC");
    } catch (error) {
        if (error instanceof Error) {
            return dataWithError({ success: false }, error.message);
        }
        return dataWithError({ success: false }, "Gagal update PIC");
    }
}