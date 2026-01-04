import { mSubSkill } from "database/schema";
import { createUpdateSchema } from "drizzle-zod";
import type z from "zod";


export const updateSubskillschema = createUpdateSchema(mSubSkill)

export type UpdateSubSkillInput = z.infer<typeof updateSubskillschema>
