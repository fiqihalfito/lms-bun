
import z from "zod"

export const makeKuisSchema = z.object({
    // idKuis: z.string(),
    question: z.string().min(1),
    answerOption: z.enum(["a", "b", "c", "d"]),
    options: z.object({
        a: z.string().min(1),
        b: z.string().min(1),
        c: z.string().min(1),
        d: z.string().min(1),
    }),
})