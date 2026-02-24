import { StatLulusSkill } from "@/features/dashboard/public/components/StatLulusSkill";
import type { Route } from "./+types/public";
import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { SubbidangFilter } from "@/features/dashboard/public/components/SubbidangFilter";
import { getJumlahLulusPerSkill } from "@/features/dashboard/public/services/getJumlahLulusPerSkill";
import { getSkillStats } from "@/features/dashboard/public/services/getSkillStats";
import { getStatBacaPerLevel } from "@/features/dashboard/public/services/getStatBacaPerLevel";
import { getAllSubbidang } from "@/features/subbidang/services/getAllSubbidang";
import { getSubBidangNameByIdSubBidang } from "@/features/subbidang/services/getSubBidangNameByIdSubBidang";
import { createLoader, parseAsString } from "nuqs/server";
import { useNavigation } from "react-router";
import { getStatIndividu } from "@/features/dashboard/public/services/getStatIndividu";
import { StatIndividu } from "@/features/dashboard/public/components/StatIndividu";
import { IndikatorIndividu } from "@/features/dashboard/public/components/IndikatorIndividu";
import { getBaseIndividuIndikator } from "@/features/dashboard/public/services/getBaseIndividuIndikator";
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
    const statIndividu = await getStatIndividu({ idSubBidang: qSubBidang })

    const baseIndividuIndikator = await getBaseIndividuIndikator()

    return {
        statsSkill,
        allSubbidang,
        subbidangData,
        // statBaca,
        jumlahLulusPerSkill,
        statIndividu,
        baseIndividuIndikator
    }
}

export default function DashboardPublicRoute({ loaderData, params }: Route.ComponentProps) {

    const { statsSkill, allSubbidang, subbidangData, jumlahLulusPerSkill, statIndividu, baseIndividuIndikator } = loaderData
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
                <StatIndividu statIndividuData={statIndividu} />
                <IndikatorIndividu baseIndividuIndikator={baseIndividuIndikator} />
            </div>
        </div>
    )
}