import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/user";
import { getUserProfileAll } from "@/features/user/services/repo";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { userColumns } from "@/features/user/lib/column-table/user-columns";
import { Button } from "@/components/ui/button";
import { data, Link } from "react-router";
import { PlusIcon } from "lucide-react";
import { getToast } from "remix-toast";
import { useToastEffect } from "@/hooks/use-toast";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const user = context.get(userContext)
    const users = await getUserProfileAll(user.idSubBidang!)

    // toast
    const { toast, headers } = await getToast(request)

    return data({ users, toast }, { headers })
}

export default function UserMasterRoute({ loaderData }: Route.ComponentProps) {

    const { users, toast } = loaderData

    useToastEffect(toast)

    return (
        <div>
            <HeaderRoute title="User" description="Data User"
                actionButton={
                    <div className="flex items-center gap-4">
                        <Button size={"lg"} asChild>
                            <Link to={`add`}>
                                <PlusIcon />
                                Tambah
                            </Link>
                        </Button>
                    </div>
                } />
            <DataTable columns={userColumns} data={users} />
        </div>
    )
}