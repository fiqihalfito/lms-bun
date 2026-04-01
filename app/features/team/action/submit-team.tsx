import { parseWithZod } from "@conform-to/zod/v4";
import { dataWithError, redirectWithSuccess } from "remix-toast";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
import { userContext } from "@/lib/context";
import { teamSchema } from "../schema/teams-schema";
import { insertNewTeam } from "../services/master/insertNewTeam";
import { updateTeam } from "../services/master/updateTeam";
import type { Route } from "./+types/submit-team";

export async function action({ request, params, context }: Route.ActionArgs) {

    // context
    const user = context.get(userContext)

    try {
        const formData = await request.formData();
        const submission = parseWithZod(formData, { schema: teamSchema });

        if (submission.status !== 'success') {
            return dataWithError(submission.reply(), "Data yang disubmit error");
        }

        const idTeam = formData.get("idTeam")

        if (!idTeam) {
            // insert layanan
            await insertNewTeam(user.idSubBidang!, submission.value.namaTeam)
            return redirectWithSuccess(`/app/master/team`, `Team ${submission.value.namaTeam} berhasil disimpan`)
        } else {
            // update layanan
            await updateTeam(idTeam as string, submission.value.namaTeam);
            return redirectWithSuccess(`/app/master/team`, `Team ${submission.value.namaTeam} berhasil diupdate`)
        }
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);
        return dataWithError(null, message);
    }
}