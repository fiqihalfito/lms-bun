import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/layanan-edit";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { FormLayanan } from "@/features/layanan/components/master-view/form-layanan";
import { LayananService } from "@/features/layanan/services/LayananService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const layanan = await LayananService.getLayananById(params.idLayanan);

  return { layanan };
}

export default function LayananEditRoute({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { layanan } = loaderData;
  const navigate = useNavigate();

  return (
    <div>
      <HeaderRoute
        title="Edit Layanan"
        description="Edit Data Layanan"
        actionButton={
          <Button
            variant={"link"}
            onClick={() =>
              navigate(`/app/master/layanan`, {
                viewTransition: true,
              })
            }
          >
            <ChevronLeftIcon />
            Kembali
          </Button>
        }
      />
      <FormLayanan dv={layanan} />
    </div>
  );
}
