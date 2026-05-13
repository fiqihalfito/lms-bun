import { HeaderRoute } from "@/components/header-route";
import { Button } from "@/components/ui/button";
import { data, useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { FormLayanan } from "@/features/layanan/components/master-view/form-layanan";
import type { Route } from "./+types/pic-add";
import { UserProfileService } from "@/features/user/services/UserProfileService";
import { userContext } from "@/lib/context";
import { FormPic } from "@/features/user/components/master-view/form-pic";
import { getToast } from "remix-toast";
import { useToastEffect } from "@/hooks/use-toast";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    // get all user for dropdown for student
    const usersDropdown = await UserProfileService.getAllUserDropdown(user?.idSubBidang!);

    // toast
    const { headers, toast } = await getToast(request);

    return data({
        usersDropdown,
        toast
    }, { headers })
}

export default function PicAddRoute({ loaderData, actionData }: Route.ComponentProps) {

    const { usersDropdown, toast } = loaderData
    const navigate = useNavigate()

    useToastEffect(toast);

    return (
        <div>
            <HeaderRoute title="Tambah PIC" description="Tambah Data PIC"
                actionButton={
                    <Button variant={"link"} onClick={() => navigate(`/app/master/pic`, {
                        viewTransition: true
                    })}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                }
            />
            {/* <pre>{JSON.stringify(usersDropdown, null, 2)}</pre> */}
            <FormPic userDropdown={usersDropdown} />
        </div>
    )
}