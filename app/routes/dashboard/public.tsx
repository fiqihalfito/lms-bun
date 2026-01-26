import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/public";
import { HeaderDashboardPublic } from "@/features/dashboard/public/components/header";

export default function DashboardPublicRoute({ loaderData, params }: Route.ComponentProps) {



    return (
        <div className="flex-1 flex flex-col">
            <HeaderDashboardPublic />
        </div>
    )
}