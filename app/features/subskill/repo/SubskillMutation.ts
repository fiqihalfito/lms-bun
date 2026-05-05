import { db } from "database/connect.server";
import { mSubSkill } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class SubskillMutation {
  static async updateSubskill(
    idSubSkill: string,
    subskill: Partial<typeof mSubSkill.$inferInsert>,
  ) {
    await db
      .update(mSubSkill)
      .set(subskill)
      .where(eq(mSubSkill.idSubSkill, idSubSkill));
  }
}
