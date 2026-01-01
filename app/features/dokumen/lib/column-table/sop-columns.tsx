import type { ColumnDef } from "@tanstack/react-table";
import type { getDokumenByTipe } from "../../services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";
import { EyeIcon, PencilIcon } from "lucide-react";

export const sopColumns: ColumnDef<Awaited<ReturnType<typeof getDokumenByTipe>>[number]>[] = [
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