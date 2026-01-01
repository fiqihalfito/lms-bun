import { mUserProfiles, mUsers, tDokumen } from 'database/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const userProfilSchema = createInsertSchema(mUserProfiles, {
    namaUser: z.string({ error: (issue) => issue.input === undefined ? "Wajib diisi" : "Invalid input." }).min(1, "Judul harus diisi"),
}).pick({
    namaUser: true,
})

export const userAccountSchema = createInsertSchema(mUsers, {
    email: z.email(),
    idRole: z.string({ error: (issue) => issue.input === undefined ? "Wajib diisi" : "Invalid input." }).min(1, "Judul harus diisi"),
}).pick({
    email: true,
    idRole: true,
})

export const userSchema = z.object({
    ...userProfilSchema.shape,
    ...userAccountSchema.shape,
    newpassword: z.string().optional(),
})
