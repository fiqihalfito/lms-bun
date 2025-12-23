import { tDokumen } from 'database/schema';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

export const sopSchema = (env: "server" | "client") => createInsertSchema(tDokumen, {
    judul: z.string({ error: (issue) => issue.input === undefined ? "Wajib diisi" : "Invalid input." }).min(5, "Judul harus diisi"),
}).pick({
    judul: true,
}).extend({
    file: env === "server" ?
        z.string() :
        z.file({ error: "File wajib diupload" })
            .mime(["application/pdf"], { error: "hanya upload pdf!" })
            .max(5 * 1024 * 1024, { error: "max 5 mb!" })
})