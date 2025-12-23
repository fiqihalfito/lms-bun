import { HeaderRoute } from "@/components/header-route";
import { TableWrapper } from "@/components/table-wrapper";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { EyeIcon, MoreHorizontal } from "lucide-react";
import type { getDokumenByTipe } from "../services";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { DataTable } from "@/components/data-table";
import { ikColumns } from "../lib/column-table/ik-columns";
import { sopColumns } from "../lib/column-table/sop-columns";

type PageNonKnowledgeProp = {
    tipeDokumen: "ik" | "sop",
    dokumenByTipe: Awaited<ReturnType<typeof getDokumenByTipe>>
}

export function PageNonKnowledge({ tipeDokumen, dokumenByTipe }: PageNonKnowledgeProp) {

    const mapTipeDokumen = {
        ik: {
            title: "Instruksi Kerja",
            description: "Daftar dokumen instruksi kerja untuk panduan teknis pekerjaan.",
            showLayanan: true,
            showTeam: true
        },
        sop: {
            title: "Standard Operating Procedure",
            description: "Daftar dokumen standar operasional prosedur yang berlaku.",
            showLayanan: false,
            showTeam: false
        },
    }[tipeDokumen];


    return (
        <div>
            <HeaderRoute title={mapTipeDokumen.title} description={mapTipeDokumen.description} />

            <DataTable columns={tipeDokumen === "ik" ? ikColumns : sopColumns} data={dokumenByTipe} />
            {/* <TableWrapper>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Judul Dokumen</TableHead>
                            {mapTipeDokumen.showLayanan && <TableHead>Layanan</TableHead>}
                            {mapTipeDokumen.showTeam && <TableHead>Team</TableHead>}
                            <TableHead>Uploader</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dokumenByTipe.map((dokumen, i) => (
                            <TableRow key={dokumen.idDokumen}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>{dokumen.judul}</TableCell>
                                {mapTipeDokumen.showLayanan && <TableCell>{dokumen.layanan?.namaLayanan}</TableCell>}
                                {mapTipeDokumen.showTeam && <TableCell>{dokumen.team?.namaTeam}</TableCell>}
                                <TableCell>{dokumen.uploader?.namaUser}</TableCell>
                                <TableCell>
                                    status baca
                                </TableCell>
                                <TableCell className="flex justify-end">
                                    <Button asChild>
                                        <NavLink to={`/app/dokumen/baca/${dokumen.idDokumen}`}>
                                            <EyeIcon />
                                            Baca
                                        </NavLink>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableWrapper> */}

        </div>
    )
}