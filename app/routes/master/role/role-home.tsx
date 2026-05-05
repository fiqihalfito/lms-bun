import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/role-home";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { TambahTeamButton } from "@/features/team/components/master-view/tambah-team-button";
import { RoleService } from "@/features/role/services/RoleService";
import { RolesColumns } from "@/features/role/lib/column-table/roles-columns";
import { EmptyRole } from "@/features/role/components/master-view/empty-role";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  // context
  const user = context.get(userContext);

  // master data
  const roles = await RoleService.getAllRole();

  // toast
  const { headers, toast } = await getToast(request);

  return data({ roles, toast }, { headers });
}

export default function RoleMasterRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { roles, toast } = loaderData;

  useToastEffect(toast);

  const title = "Role";
  const description = "Data Role";

  return (
    <div>
      <HeaderRoute
        title={title}
        description={description}
        actionButton={<TambahTeamButton />}
      />
      {roles.length === 0 ? (
        <EmptyRole />
      ) : (
        <DataTable columns={RolesColumns} data={roles} />
      )}
    </div>
  );
}
