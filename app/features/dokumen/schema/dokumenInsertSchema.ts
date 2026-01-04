import { tDokumen } from "database/schema";
import { createInsertSchema } from "drizzle-zod";
import type z from "zod"

export const dokumenInsertSchema = createInsertSchema(tDokumen)

export type DokumenInsertSchemaProp = z.infer<typeof dokumenInsertSchema>
