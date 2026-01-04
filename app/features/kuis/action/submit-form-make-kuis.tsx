import { parseWithZod } from "@conform-to/zod/v4";
import type { Route } from "./+types/submit-form-make-kuis";
import { makeKuisSchema } from "../schema/makeKuisSchema";
import { dataWithError } from "remix-toast";

export async function action({ request, params, context }: Route.ActionArgs) {

    const formData = await request.formData()
    const submission = parseWithZod(formData, { schema: makeKuisSchema })

    if (submission.status !== "success") {
        return dataWithError(submission.reply(), "Data yang dikirim error")
    }

    // cek kalau ada idQuestion, berarti edit, instead insert
    const idKuisQuestion = formData.get("idKuisQuestion")

    if (idKuisQuestion) {
        console.log("ada idQuestion")

    } else {
        console.log("tidak ada idQuestion")
    }





    return {}
}