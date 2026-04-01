import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/layanan-home";
import { getLayananAllFilter } from "@/features/layanan/services/master/getLayananAllFilter";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { layananColumns } from "@/features/layanan/lib/column-table/layanan-columns";
import { TambahLayananButton } from "@/features/layanan/components/master-view/tambah-layanan-button";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { EmptyLayanan } from "@/features/layanan/components/master-view/empty-layanan";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // context
    const user = context.get(userContext)

    // master data
    const layanan = await getLayananAllFilter(user.idSubBidang!)

    // toast
    const { headers, toast } = await getToast(request)

    return data({ layanan, toast }, { headers })
}

export default function LayananMasterRoute({ loaderData, params }: Route.ComponentProps) {

    const { layanan, toast } = loaderData

    useToastEffect(toast)

    const title = "Layanan"
    const description = "Data Layanan"

    return (
        <div>
            <HeaderRoute
                title={title}
                description={description}
                actionButton={
                    <TambahLayananButton />
                } />
            {layanan.length === 0 ? (
                <EmptyLayanan />
            ) : (
                <DataTable columns={layananColumns} data={layanan} />
            )}
        </div>
    )
}