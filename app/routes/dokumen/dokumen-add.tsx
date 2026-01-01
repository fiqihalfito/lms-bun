import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/dokumen-add";
import { FormSOP } from "@/features/dokumen/components/form-sop";
import { getToast } from "remix-toast";
import { data, useNavigate } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { FormIK } from "@/features/dokumen/components/form-ik";


export async function loader({ request, params }: Route.LoaderArgs) {

    if (!params.tipeDokumen) {
        throw new Error("Tipe dokumen tidak ditemukan");
    }

    const { headers, toast } = await getToast(request)

    return data({ toast }, { headers })
}


export default function AddDokumenRoute({ loaderData, params }: Route.ComponentProps) {

    const { toast } = loaderData

    useToastEffect(toast)

    const mapTipeDokumen = {
        ik: {
            title: "Tambah Dokumen Instruksi Kerja",
            description: "Tambahkan dokumen instruksi kerja untuk panduan teknis pekerjaan.",
        },
        sop: {
            title: "Tambah Dokumen SOP",
            description: "Tambahkan dokumen standar operasional prosedur yang berlaku.",
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
            {params.tipeDokumen === "ik" ? <FormIK /> : <FormSOP />}
        </div>
    )
}