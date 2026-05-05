import { HeaderRoute } from "@/components/header-route";
import { ChevronLeftIcon, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { DataTable } from "@/components/data-table";
import { ikColumns } from "../lib/column-table/ik-columns";
import { sopColumns } from "../lib/column-table/sop-columns";
import type { DokumenByTipe } from "../lib/types";

type PageNonKnowledgeProp = {
  tipeDokumen: "ik" | "sop";
  // dokumenByTipe: Awaited<ReturnType<typeof getDokumenByTipe>>
  dokumenByTipe: DokumenByTipe;
};

export function PageNonKnowledge({
  tipeDokumen,
  dokumenByTipe,
}: PageNonKnowledgeProp) {
  const mapTipeDokumen = {
    ik: {
      title: "Instruksi Kerja",
      description:
        "Daftar dokumen instruksi kerja untuk panduan teknis pekerjaan.",
      showLayanan: true,
      showTeam: true,
    },
    sop: {
      title: "SOP - Standard Operating Procedure",
      description: "Daftar dokumen standar operasional prosedur yang berlaku.",
      showLayanan: false,
      showTeam: false,
    },
  }[tipeDokumen];

  const navigate = useNavigate();

  return (
    <div>
      <HeaderRoute
        title={mapTipeDokumen.title}
        description={mapTipeDokumen.description}
        actionButton={
          <div className="flex items-center gap-4">
            <Button
              variant={"link"}
              onClick={() =>
                navigate(`/app/dokumen`, {
                  viewTransition: true,
                })
              }
            >
              <ChevronLeftIcon />
              Kembali
            </Button>
            <Button size={"lg"} asChild>
              <Link to={`add`}>
                <PlusIcon />
                Tambah
              </Link>
            </Button>
          </div>
        }
      />

      <DataTable
        columns={tipeDokumen === "ik" ? ikColumns : sopColumns}
        data={dokumenByTipe}
      />
    </div>
  );
}
