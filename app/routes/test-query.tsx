import { db } from "database/connect";
import type { Route } from "./+types/test-query";
import { mSkill } from "database/schema";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const res = await db.select().from(mSkill)

    return { res }
}