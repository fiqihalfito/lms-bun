import { HeaderRoute } from "@/components/header-route";
import { FormUser } from "@/features/user/components/form-user";
import type { Route } from "./+types/user-add";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";

export default function UserAddRoute({ loaderData }: Route.ComponentProps) {

    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title="Tambah User" description="Tambah Data User"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(`/app/master/user`, {
                        viewTransition: true
                    })}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormUser />
        </div>
    )
}