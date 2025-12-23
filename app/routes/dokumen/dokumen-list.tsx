import { PageKnowledge } from "@/features/dokumen/components/PageKnowledge";
import { PageNonKnowledge } from "@/features/dokumen/components/PageNonKnowledge";
import type { Route } from "./+types/dokumen-list";
import { getDokumenByTipe } from "@/features/dokumen/services";
import { userContext } from "@/lib/context";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext);
    const { tipeDokumen } = params;

    // toast
    const { toast, headers } = await getToast(request)

    // fetch data
    if (tipeDokumen === "knowledge") {
        // const dokumen = await getDokumenByTipe(tipeDokumen);
        return data({ dokumen: [], toast }, { headers })
    } else {
        const dokumen = await getDokumenByTipe(tipeDokumen, user.idUser);
        return data({ dokumen, toast }, { headers })
    }
}

export default function DokumenListRoute({ params, loaderData }: Route.ComponentProps) {

    const { tipeDokumen } = params;
    const { dokumen, toast } = loaderData;

    useToastEffect(toast)

    if (tipeDokumen === "knowledge") {
        return <PageKnowledge />
    } else {
        return <PageNonKnowledge tipeDokumen={tipeDokumen as "ik" | "sop"} dokumenByTipe={dokumen} />
    }
}