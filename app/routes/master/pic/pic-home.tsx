import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/pic-home";
import { userContext } from "@/lib/context";
import { DataTable } from "@/components/data-table";
import { getToast } from "remix-toast";
import { data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { UserPICSubskillService } from "@/features/user/services/UserPICSubskill";
import { EmptyUser } from "@/features/user/components/master-view/empty-user";
import { userPicColumns } from "@/features/user/lib/column-table/user-pic-columns";
import { TambahPicButton } from "@/features/user/components/master-view/tambah-pic-button";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  // context
  const user = context.get(userContext);

  // master data
  const pics = await UserPICSubskillService.getPICSubskill(user.idSubBidang!);

  // toast
  const { headers, toast } = await getToast(request);

  return data({ pics, toast }, { headers });
}

export default function RoleMasterRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { pics, toast } = loaderData;

  useToastEffect(toast);

  const title = "PIC";
  const description = "Data PIC Subskill";

  return (
    <div>
      <HeaderRoute
        title={title}
        description={description}
        actionButton={<TambahPicButton />}
      />
      {pics.length === 0 ? (
        <EmptyUser />
      ) : (
        <DataTable columns={userPicColumns} data={pics} />
      )}
    </div>
  );
}
