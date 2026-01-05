
import z from "zod"

export const makeKuisSchema = z.object({
    // idKuis: z.string(),
    question: z.string().min(1),
    answerOption: z.enum(["a", "b", "c", "d"]),
    options: z.object({
        a: z.string(),
        b: z.string(),
        c: z.string(),
        d: z.string(),
    }),
})