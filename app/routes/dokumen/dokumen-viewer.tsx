import { HeaderRoute } from "@/components/header-route";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { DokumenViewer } from "@/features/dokumen/components/DokumenViewer";
import { DokumenViewerEmpty } from "@/features/dokumen/components/DokumenViewerEmpty";
import { userContext } from "@/lib/context";
import type { Route } from "./+types/dokumen-viewer";
import invariant from "tiny-invariant";
import { DokumenService } from "@/features/dokumen/services/DokumenService";
import { StorageService } from "@/features/storage/service/StorageService";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const cUser = context.get(userContext);

  await DokumenService.markAsRead(params.idDokumen, cUser.idUser);
  const dokumen = await DokumenService.getDokumenById(params.idDokumen);
  invariant(dokumen.length > 0, "Dokumen not found");

  let presignedUrl;
  if (dokumen[0].filename) {
    presignedUrl = StorageService.getFileUrl(dokumen[0].filename);
  }

  return { presignedUrl, dokumen };
}

export default function DokumenViewerRoute({
  loaderData,
}: Route.ComponentProps) {
  const { presignedUrl, dokumen } = loaderData;
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col">
      <HeaderRoute
        title={dokumen[0].judul || "Dokumen"}
        description={"Membaca dokumen"}
        actionButton={
          <Button size={"lg"} onClick={() => navigate(-1)}>
            <ChevronLeftIcon />
            Kembali
          </Button>
        }
      />

      {presignedUrl ? (
        <DokumenViewer key={presignedUrl} presignedUrl={presignedUrl!} />
      ) : (
        <DokumenViewerEmpty />
      )}
    </div>
  );
}
