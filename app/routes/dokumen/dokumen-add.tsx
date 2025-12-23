import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/dokumen-add";
import { FormSOP } from "@/features/dokumen/components/form-sop";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";


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

    return (
        <div>
            <HeaderRoute title={mapTipeDokumen.title} description={mapTipeDokumen.description} />
            <FormSOP />
        </div>
    )
}