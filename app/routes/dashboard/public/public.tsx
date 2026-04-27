import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { getAllSubbidang } from "@/features/subbidang/services/getAllSubbidang";
import { getSubBidangNameByIdSubBidang } from "@/features/subbidang/services/getSubBidangNameByIdSubBidang";
import { createLoader, parseAsString } from "nuqs/server";
import { NavLink, Outlet, useNavigation } from "react-router";
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

    // const { allSubbidang, subbidangData } = loaderData
    // const navigation = useNavigation();
    // const isNavigating = Boolean(navigation.location);

    const route = [
        {
            title: "Statistik Lulus Skill",
            desc: "Melihat jumlah orang yang lulus skill",
            href: "/dashboard/stat-lulus-skill"
        },
        {
            title: "Statistik Individu",
            desc: "Melihat statistik individu",
            href: "/dashboard/stat-individu"
        }
    ]

    return (
        <div>
            {/* <HeaderDashboardPublic />
            <div id="container" className="mx-4 xl:mx-40 flex gap-x-8 xl:gap-x-16 ">
                <div className="sticky top-16 w-52 h-fit ">
                    <NavDashboard />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div> */}
            <div className="grid grid-cols-2 gap-8">
                {route.map((item, index) => (
                    <NavLink to={item.href} key={index} className={"group"} >
                        <div className="py-12 border px-8 rounded-xl shadow-md group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-colors">
                            <h4 className="text-3xl font-bold">{item.title}</h4>
                            <p className="text-muted-foreground group-hover:text-white transition-colors">{item.desc}</p>
                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}