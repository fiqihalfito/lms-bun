import { HeaderRoute } from "@/components/header-route";
import { minio } from "@/lib/minio.server";
import { getDokumenFilenameById } from "@/features/dokumen/services/getDokumenFilenameById";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon } from "lucide-react";
import { DokumenViewer } from "@/features/dokumen/components/DokumenViewer";
import { DokumenViewerEmpty } from "@/features/dokumen/components/DokumenViewerEmpty";
import { markAsRead } from "@/features/dokumen/services/markAsRead";
import { userContext } from "@/lib/context";
import type { Route } from "./+types/dokumen-viewer";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    const cUser = context.get(userContext);

    await markAsRead(params.idDokumen, cUser.idUser);
    const filename = await getDokumenFilenameById(params.idDokumen);

    let presignedUrl
    if (filename) {
        presignedUrl = minio.getFileUrl(filename)
    }

    return { presignedUrl }
}

export default function DokumenViewerRoute({ loaderData }: Route.ComponentProps) {

    const { presignedUrl } = loaderData;
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col">
            <HeaderRoute
                title="Dokumen"
                description="Dokumen Viewer"
                actionButton={
                    <Button size={"lg"} onClick={() => navigate(-1)}>
                        <ChevronLeftIcon />
                        Kembali
                    </Button>
                } />

            {presignedUrl ? (
                <DokumenViewer key={presignedUrl} presignedUrl={presignedUrl!} />
            ) : (
                <DokumenViewerEmpty />
            )}



        </div>
    )
}