import { HeaderRoute } from "@/components/header-route";
import { FormUser } from "@/features/user/components/form-user";
import { getUserDataByIdUser } from "@/features/user/services/repo/getUserDataByIdUser";
import { userContext } from "@/lib/context";
import type { Route } from "./+types/user-edit";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const users = await getUserDataByIdUser(params.idUser)

    return { users }
}

export default function UserEditRoute({ loaderData, params }: Route.ComponentProps) {

    const { users } = loaderData
    const navigate = useNavigate()

    return (
        <div>
            <HeaderRoute title="Edit User" description="Edit Data User"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(`/app/master/user`, {
                        viewTransition: true
                    })}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            <FormUser dv={users} />
        </div>
    )
}