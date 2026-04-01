import { mTeam } from 'database/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const teamSchema = createInsertSchema(mTeam, {
    namaTeam: z.string({ error: (issue) => issue.input === undefined ? "Wajib diisi" : "Invalid input." }).min(1, "Judul harus diisi"),
}).pick({
    namaTeam: true,
})
