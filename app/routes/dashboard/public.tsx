import { StatLulusSkill } from "@/features/dashboard/public/components/StatLulusSkill";
import type { Route } from "./+types/public";
import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { StatsSkill } from "@/features/dashboard/public/components/stats-skill";
import { SubbidangFilter } from "@/features/dashboard/public/components/SubbidangFilter";
import { getJumlahLulusPerSkill } from "@/features/dashboard/public/services/getJumlahLulusPerSkill";
import { getSkillStats } from "@/features/dashboard/public/services/getSkillStats";
import { getStatBacaPerLevel } from "@/features/dashboard/public/services/getStatBacaPerLevel";
import { getAllSubbidang } from "@/features/subbidang/services/getAllSubbidang";
import { getSubBidangNameByIdSubBidang } from "@/features/subbidang/services/getSubBidangNameByIdSubBidang";
import { createLoader, parseAsString } from "nuqs/server";
import { useNavigation } from "react-router";
// import { getSubBidangNameByIdSubBidang } from "@/features/subbidang/services/getSubBidangNameByIdSubBidang";


export const searchParams = {
    qSubBidang: parseAsString.withDefault('')
}

export const loadSearchParams = createLoader(searchParams)


export async function loader({ request, params, context }: Route.LoaderArgs) {

    // get url query
    const { qSubBidang } = await loadSearchParams(request.url)
    const statsSkill = await getSkillStats()
    const allSubbidang = await getAllSubbidang()
    const subbidangData = await getSubBidangNameByIdSubBidang(qSubBidang)
    const statBaca = await getStatBacaPerLevel({ idSubBidang: qSubBidang })
    const jumlahLulusPerSkill = await getJumlahLulusPerSkill({ idSubBidang: qSubBidang })


    return {
        statsSkill,
        allSubbidang,
        subbidangData,
        // statBaca,
        jumlahLulusPerSkill
    }
}

export default function DashboardPublicRoute({ loaderData, params }: Route.ComponentProps) {

    const { statsSkill, allSubbidang, subbidangData, jumlahLulusPerSkill } = loaderData
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="flex-1 ">
            <HeaderDashboardPublic />
            {/* container */}
            <div id="container" className="flex-1 max-w-7xl mx-auto">
                <SubbidangFilter subbidang={allSubbidang} />
                {/* <StatsSkill statsSkill={statsSkill} /> */}
                <StatLulusSkill teamStat={jumlahLulusPerSkill} />
            </div>
        </div>
    )
}