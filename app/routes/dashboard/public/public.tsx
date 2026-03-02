import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { getAllSubbidang } from "@/features/subbidang/services/getAllSubbidang";
import { getSubBidangNameByIdSubBidang } from "@/features/subbidang/services/getSubBidangNameByIdSubBidang";
import { createLoader, parseAsString } from "nuqs/server";
import { Outlet, useNavigation } from "react-router";
import { NavDashboard } from "@/features/dashboard/public/components/NavDashboard";
import type { Route } from "./+types/public";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
// import { getSubBidangNameByIdSubBidang } from "@/features/subbidang/services/getSubBidangNameByIdSubBidang";


export const searchParams = {
    qSubBidang: parseAsString.withDefault('')
}

export const loadSearchParams = createLoader(searchParams)


export async function loader({ request, params, context }: Route.LoaderArgs) {

    // get url query
    const { qSubBidang } = await loadSearchParams(request.url)

    const allSubbidang = await getAllSubbidang()
    const subbidangData = await getSubBidangNameByIdSubBidang(qSubBidang)




    return {
        allSubbidang,
        subbidangData,
    }
}

export default function DashboardPublicRoute({ loaderData, params }: Route.ComponentProps) {

    const { allSubbidang, subbidangData } = loaderData
    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="flex-1 ">
            <HeaderDashboardPublic />
            {/* container */}
            {isNavigating && <Badge><Spinner />Loading</Badge>}
            <div id="container" className="mx-40 flex gap-x-32 ">
                {/* h-fit penting untuk sticky kalau parent flex */}
                <div className="sticky top-16 w-60 h-fit shrink-0">
                    <NavDashboard />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}