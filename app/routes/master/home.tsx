import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/home";

export default function MasterHome({ }: Route.ComponentProps) {

    return (
        <div>
            <HeaderRoute title="Data Master" description="Sumber Data Master" />
        </div>
    )
}