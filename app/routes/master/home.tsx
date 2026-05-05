import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/home";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // data PIC yang telah upload dan membuat kuis

    return {}
}

export default function MasterHome({ }: Route.ComponentProps) {

    return (
        <div>
            <HeaderRoute title="Data Master" description="Sumber Data Master" />
        </div>
    )
}