import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/layanan-edit";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { getLayananById } from "@/features/layanan/services/master/getLayananByid";
import invariant from "tiny-invariant";
import { FormLayanan } from "@/features/layanan/components/master-view/form-layanan";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const layanan = await getLayananById(params.idLayanan)
    invariant(layanan.length > 0, "Layanan tidak ditemukan")

    return { layanan: layanan[0] }
}

export default function LayananEditRoute({ loaderData, params }: Route.ComponentProps) {

    const { layanan } = loaderData
    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title="Edit Layanan" description="Edit Data Layanan"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(`/app/master/layanan`, {
                        viewTransition: true
                    })}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormLayanan dv={layanan} />
        </div>
    )
}