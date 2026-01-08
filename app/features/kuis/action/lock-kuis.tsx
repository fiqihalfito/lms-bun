import { dataWithSuccess, dataWithWarning } from "remix-toast";
import { updateKuisMetaData } from "../services/updateKuisMetaData";
import type { Route } from "./+types/lock-kuis";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData()
    const isLocked = formData.get("locked") === "true"

    await updateKuisMetaData(params.idKuis, {
        isLocked: isLocked,
    })

    if (isLocked) {
        return dataWithWarning({ isLocked: isLocked }, {
            message: "Kuis di kunci",
        })
    } else {
        return dataWithSuccess({ isLocked: isLocked }, {
            message: "Kuis berhasil di publish",
        })
    }
}