import { z } from 'zod';

export const userPicFormSchema = z.object({
    idUser: z.string({ error: 'User harus diisi' }).min(1, "User kependekan"),
})
