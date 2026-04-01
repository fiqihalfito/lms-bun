import { mLayanan } from 'database/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const layananSchema = createInsertSchema(mLayanan, {
    namaLayanan: z.string({ error: (issue) => issue.input === undefined ? "Wajib diisi" : "Invalid input." }).min(1, "Judul harus diisi"),
}).pick({
    namaLayanan: true,
})
