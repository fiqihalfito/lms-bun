import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/submit-layanan";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
import { layananSchema } from "../schema/layanan-schema";
import { insertNewLayanan } from "../services/master/insertNewLayanan";
import { userContext } from "@/lib/context";
import { updateLayanan } from "../services/master/updateLayanan";

export async function action({ request, params, context }: Route.ActionArgs) {

    // context
    const user = context.get(userContext)

    try {
        const formData = await request.formData();
        const submission = parseWithZod(formData, { schema: layananSchema });

        if (submission.status !== 'success') {
            return dataWithError(submission.reply(), "Data yang disubmit error");
        }

        const idLayanan = formData.get("idLayanan")

        if (!idLayanan) {
            // insert layanan
            await insertNewLayanan(user.idSubBidang!, submission.value.namaLayanan)
            return redirectWithSuccess(`/app/master/layanan`, `Layanan ${submission.value.namaLayanan} berhasil disimpan`)
        } else {
            // update layanan
            await updateLayanan(idLayanan as string, submission.value.namaLayanan);
            return redirectWithSuccess(`/app/master/layanan`, `Layanan ${submission.value.namaLayanan} berhasil diupdate`)
        }
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);
        return dataWithError(null, message);
    }
}