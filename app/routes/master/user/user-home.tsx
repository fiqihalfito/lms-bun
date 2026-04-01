import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/user-home";
import { getUserProfileAll } from "@/features/user/services/repo";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { userColumns } from "@/features/user/lib/column-table/user-columns";
import { Button } from "@/components/ui/button";
import { Await, data, Link, useNavigation, useSearchParams } from "react-router";
import { PlusIcon } from "lucide-react";
import { getToast } from "remix-toast";
import { useToastEffect } from "@/hooks/use-toast";
import { MasterUserFilter } from "@/components/master-user-filter";
import { getTeamsAll } from "@/features/team/services/get-teams-all";
import { createLoader, parseAsNativeArrayOf, parseAsString } from "nuqs/server";
import { EmptyUser } from "@/features/user/components/master-view/empty-user";
import { LoadingUser } from "@/features/user/components/master-view/loading-user";
import { Suspense } from "react";

const userMasterSearchParams = {
    team: parseAsNativeArrayOf(parseAsString)
}

export const loadUserMasterSearchParams = createLoader(userMasterSearchParams)

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const { team } = loadUserMasterSearchParams(request.url)


    const user = context.get(userContext)
    const users = getUserProfileAll(user.idSubBidang!, { team })

    // filter data
    const [teams] = await Promise.all([
        getTeamsAll(user.idSubBidang!),
    ])

    // toast
    const { toast, headers } = await getToast(request)

    return data({ users, toast, teams }, { headers })
}

export default function UserMasterRoute({ loaderData }: Route.ComponentProps) {

    const { users, toast, teams } = loaderData

    const [searchParams] = useSearchParams();

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
            <div className="flex flex-row gap-8">

                <Suspense key={searchParams.toString()} fallback={<LoadingUser />}>
                    <Await resolve={users}>
                        {(users) => (
                            users.length > 0 ? (
                                <DataTable className="flex-1" columns={userColumns} data={users} />
                            ) : (
                                <div className="flex-1">
                                    <EmptyUser />
                                </div>
                            )
                        )}
                    </Await>
                </Suspense>
                <MasterUserFilter teams={teams} />
            </div>
        </div>
    )
}