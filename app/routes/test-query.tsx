import { db } from "database/connect";
import type { Route } from "./+types/test-query";
import { mSubSkill, tKuisProgress, tStatusBaca } from "database/schema";
import { and, eq, gte, sql } from "drizzle-orm";
import { getSubskillStatPerLevel } from "@/features/subskill/services/getSubskillStatPerLevel";
import { userContext } from "@/lib/context";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    const res = await getSubskillStatPerLevel("a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1", 1, "c5c966fa-5081-462f-b0d5-493addfe7131")

    return { res }
}