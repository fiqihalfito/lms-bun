import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import type { getLayananAllFilter } from "../../services/master/getLayananAllFilter";

export const layananColumns: ColumnDef<Awaited<ReturnType<typeof getLayananAllFilter>>[number]>[] = [
    {
        id: "nomor",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "namaLayanan",
        header: "Nama Layanan",
    },
    {
        id: "action",
        header: () => <div className="text-right">Aksi</div>,
        cell: ({ row }) => (
            <div className="flex justify-end gap-x-1">
                <Button asChild size="sm">
                    <NavLink to={`${row.original.idLayanan}/edit`}>
                        <PencilIcon />
                        Edit
                    </NavLink>
                </Button>
            </div>
        ),
    },
];