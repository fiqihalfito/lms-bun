import type { ColumnDef } from "@tanstack/react-table";
import type { getDokumenByTipe } from "../../services";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Badge } from "@/components/ui/badge";

export const ikColumns: ColumnDef<Awaited<ReturnType<typeof getDokumenByTipe>>[number]>[] = [
    {
        id: "nomor",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "judul",
        header: "Judul Dokumen",
    },
    {
        id: "status-baca",
        header: "Status Baca",
        accessorFn: (row) => row.pembaca?.created_at,
        cell: ({ getValue }) => {
            const date = getValue<string | Date | null>();
            return date ? (
                <Badge className="bg-green-600 hover:bg-green-600">
                    Done : {new Date(date).toLocaleString("id-ID")}
                </Badge>
            ) : (
                <Badge variant="destructive">Not yet</Badge>
            );
        },
    },
    {
        id: "terakhir-baca",
        header: "Terakhir Baca",
        accessorFn: (row) => row.pembaca?.updated_at,
        cell: ({ getValue }) => {
            const date = getValue<string | Date | null>();
            return date ? (
                <Badge variant={"secondary"}>
                    {new Date(date).toLocaleString("id-ID")}
                </Badge>
            ) : (
                <Badge variant="destructive">Not yet</Badge>
            );
        },
    },
    {
        id: "layanan",
        header: "Layanan",
        accessorFn: (row) => row.layanan?.namaLayanan,
        cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
        id: "uploader",
        header: "Uploader",
        accessorFn: (row) => row.uploader?.namaUser,
        cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
        id: "team",
        header: "Team",
        accessorFn: (row) => row.team?.namaTeam,
        cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
        id: "action",
        header: () => <div className="text-right">Aksi</div>,
        cell: ({ row }) => (
            <div className="flex justify-end gap-x-1">
                <Button asChild size="sm">
                    <NavLink to={`/app/dokumen/baca/${row.original.idDokumen}`}>
                        <EyeIcon />
                        Baca
                    </NavLink>
                </Button>
                <Button variant="secondary" asChild size="sm">
                    <NavLink to={`${row.original.idDokumen}/edit`}>
                        <PencilIcon />
                        Edit
                    </NavLink>
                </Button>
            </div>
        ),
    },
];