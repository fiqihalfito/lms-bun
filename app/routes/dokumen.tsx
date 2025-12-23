import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/dokumen";
import { BookCheckIcon, BookKeyIcon, PyramidIcon } from "lucide-react";
import { ItemDokumenLinkLobby } from "@/features/dokumen/components/ItemDokumenLinkLobby";


export default function DokumenRoute({ }: Route.ComponentProps) {



    return (
        <div>
            <HeaderRoute title="Dokumen" description="Tipe Dokumen" />
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <ItemDokumenLinkLobby title="SOP" description="Standard Operating Procedure" icon={BookKeyIcon} to="tipe/sop" />
                    <ItemDokumenLinkLobby title="IK" description="Instruksi Kerja" icon={BookCheckIcon} to="tipe/ik" />
                </div>
                <ItemDokumenLinkLobby title="Knowledge" description="Dokumen Pembelajaran dan Skill" icon={PyramidIcon} to="tipe/knowledge" />
            </div>
        </div>
    )
}