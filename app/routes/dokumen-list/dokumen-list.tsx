import type { Route } from "./+types/dokumen-list";
import { HeaderRoute } from "@/components/header-route";
import { PageKnowledge } from "@/features/dokumen/components/PageKnowledge";
import { PageNonKnowledge } from "@/features/dokumen/components/PageNonKnowledge";
import { getDokumenByTipe } from "@/features/dokumen/services";

export async function loader({ request, params }: Route.LoaderArgs) {

    const { tipeDokumen } = params;

    // fetch data
    if (tipeDokumen === "knowledge") {
        // const dokumen = await getDokumenByTipe(tipeDokumen);
        return { dokumen: [] }
    } else {
        const dokumen = await getDokumenByTipe(tipeDokumen);
        return { dokumen }
    }
}

export default function DokumenListRoute({ params, loaderData }: Route.ComponentProps) {

    const { tipeDokumen } = params;
    const { dokumen } = loaderData;


    if (tipeDokumen === "knowledge") {
        return <PageKnowledge />
    } else {
        return <PageNonKnowledge tipeDokumen={tipeDokumen as "ik" | "sop"} dokumenByTipe={dokumen} />
    }
}