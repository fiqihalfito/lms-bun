import { getToast } from "remix-toast";
import type { Route } from "./+types/dokumen-edit";
import { data, useNavigate } from "react-router";
import { HeaderRoute } from "@/components/header-route";
import { FormSOP } from "@/features/dokumen/components/form-sop";
import { getDokumenById } from "@/features/dokumen/services/getDokumenById";
import invariant from "tiny-invariant";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

export async function loader({ request, params }: Route.LoaderArgs) {

    // invariant(params.idDokumen, "idDokumen is not found")
    const dokumen = await getDokumenById(params.idDokumen)
    // if (dokumen.length === 0) {
    //     throw new Error("Dokumen tidak ditemukan")
    // }

    return { dokumen }
}


export default function EditDokumenRoute({ params, loaderData }: Route.ComponentProps) {

    const { dokumen } = loaderData



    const mapTipeDokumen = {
        ik: {
            title: `Edit Dokumen Instruksi Kerja`,
            description: "Judul: " + dokumen[0].judul!,
        },
        sop: {
            title: `Edit Dokumen SOP`,
            description: "Judul: " + dokumen[0].judul!,
        },
    }[params.tipeDokumen as "ik" | "sop"];

    const navigate = useNavigate();

    return (
        <div>
            <HeaderRoute title={mapTipeDokumen.title} description={mapTipeDokumen.description}
                actionButton={
                    <Button variant={"link"} size={"lg"} onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormSOP dv={dokumen[0]} />
        </div>
    )
}