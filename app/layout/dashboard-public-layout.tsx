import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { Outlet, useNavigation } from "react-router";
import { NavDashboard } from "@/features/dashboard/public/components/NavDashboard";



export default function DashboardPublicLayout() {

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="flex-1 ">
            <HeaderDashboardPublic />
            {/* container */}
            <div id="container" className="mx-4 xl:mx-40 flex gap-x-8 xl:gap-x-16 ">
                {/* h-fit penting untuk sticky kalau parent flex */}
                <div className="sticky top-16 w-52 h-fit ">
                    <NavDashboard />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}