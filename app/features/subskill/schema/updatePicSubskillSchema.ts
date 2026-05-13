import z from "zod";

export const updatePicSubskillSchema = z.object({
    idPic: z.string({ error: 'PIC is required' }),
})