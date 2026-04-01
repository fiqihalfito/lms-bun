import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/layanan-add";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { FormLayanan } from "@/features/layanan/components/master-view/form-layanan";

export default function LayananAddRoute({ loaderData }: Route.ComponentProps) {

    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title="Tambah Layanan" description="Tambah Data Layanan"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(`/app/master/layanan`, {
                        viewTransition: true
                    })}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormLayanan />
        </div>
    )
}