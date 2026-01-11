import { sql } from "drizzle-orm";
import { getKuisJawabanUserByIdKuisProgress } from "../services/pengerjaan-kuis/getKuisJawabanUserByIdKuisProgress";
import { updateKuisProgress } from "../services/updateKuisProgress";
import type { Route } from "./+types/submit-kuis";
import { redirectWithSuccess } from "remix-toast";
import { redirect, replace } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const jawabanUserData = await getKuisJawabanUserByIdKuisProgress(params.idKuisProgress)

    const totalScore = jawabanUserData.reduce(
        (total, item) => total + (item.score ?? 0),
        0
    )

    const jumlahBenar = jawabanUserData.reduce(
        (total, item) => total + (item.isCorrect ? 1 : 0),
        0
    )

    const totalWaktuPengerjaan = jawabanUserData.reduce(
        (total, item) => total + (item?.waktuPengerjaanDetik ?? 0),
        0
    )

    await updateKuisProgress(params.idKuisProgress, {
        totalScore: totalScore,
        jumlahBenar: jumlahBenar,
        totalWaktuPengerjaanDetik: totalWaktuPengerjaan,
        completedAt: sql`now()` as unknown as string,
    })

    return replace(`/app/kuis/${params.idKuis}/progress/${params.idKuisProgress}/finish`)

    // return redirectWithSuccess(`/app/knowledge/team/${params.idTeam}/skill/${params.idSkill}/level/${item.level}/subskill`, "Kuis Selesai")
}