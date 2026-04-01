import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/team-add";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { FormTeam } from "@/features/team/components/master-view/form-team";

export default function TeamAddRoute({ loaderData }: Route.ComponentProps) {

    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title="Tambah Team" description="Tambah Data Team"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(`/app/master/team`, {
                        viewTransition: true
                    })}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormTeam />
        </div>
    )
}