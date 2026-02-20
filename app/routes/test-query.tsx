import { getJumlahLulusPerSkill } from "@/features/dashboard/public/services/getJumlahLulusPerSkill";
import type { Route } from "./+types/test-query";
import { db } from "database/connect.server";
import { mSkill, mSubSkill, mTeam, mTeamMember, mUserProfiles, tKuisProgress } from "database/schema";
import { and, desc, eq, getColumns, gte, isNotNull, sql } from "drizzle-orm";
import { getStatIndividu } from "@/features/dashboard/public/services/getStatIndividu";
// import { getLevelSubskillListDataByIdSkill } from "@/features/subskill/services/getSubskillLevelByIdSkill";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    // const res = await getJumlahLulusPerSkill({ idSubBidang: "s1" })

    // const res = await getLevelSubskillListDataByIdSkill("a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1", "c5c966fa-5081-462f-b0d5-493addfe7131")

    const res = await getStatIndividu({ idSubBidang: "s1" })


    return res
}