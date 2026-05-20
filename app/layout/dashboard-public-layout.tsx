import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";
import { Outlet, useNavigation } from "react-router";
import { NavDashboard } from "@/features/dashboard/public/components/NavDashboard";



export default function DashboardPublicLayout() {

    const navigation = useNavigation();
    const isNavigating = Boolean(navigation.location);

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <HeaderDashboardPublic />
            {/* container */}
            <div id="container" className="flex-1 flex flex-row overflow-hidden ">
                <nav className="w-80 border-r pt-12 overflow-y-auto">
                    <NavDashboard />
                </nav>
                <main className="flex-1 p-16 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}