import { IndividualIndikatorService } from "@/features/dashboard/public/services/IndividualIndikatorService";
import type { Route } from "./+types/test-query";
// import { getIndividuIndikator } from "@/features/dashboard/public/repositories/getIndividuIndikator";
// import { getLevelSubskillListDataByIdSkill } from "@/features/subskill/services/getSubskillLevelByIdSkill";

export async function loader({ request, params, context }: Route.LoaderArgs) {
    // const res = await getJumlahLulusPerSkill({ idSubBidang: "s1" })

    // const res = await getLevelSubskillListDataByIdSkill("a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1", "c5c966fa-5081-462f-b0d5-493addfe7131")

    // const res = await getStatIndividu({ idSubBidang: "s1" })

    const res = await IndividualIndikatorService()


    return res
}