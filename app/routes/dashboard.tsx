import { getToast } from "remix-toast";
import type { Route } from "./+types/dashboard";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { HeaderRoute } from "@/components/header-route";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const { toast, headers } = await getToast(request);

    return data({ toast }, { headers })
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {

    const { toast } = loaderData

    useToastEffect(toast)

    return (
        <div>
            <HeaderRoute title="Dashboard" description="Melihat status terkini progress dokumen" />
        </div>
    )
}