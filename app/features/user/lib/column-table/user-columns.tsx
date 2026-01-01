import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Badge } from "@/components/ui/badge";
import type { getUserProfileAll } from "../../services/repo";

export const userColumns: ColumnDef<Awaited<ReturnType<typeof getUserProfileAll>>[number]>[] = [
    {
        id: "nomor",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "namaUser",
        header: "Nama User",
    },
    {
        id: "action",
        header: () => <div className="text-right">Aksi</div>,
        cell: ({ row }) => (
            <div className="flex justify-end gap-x-1">
                <Button asChild size="sm">
                    <NavLink to={`${row.original.idUser}/edit`}>
                        <PencilIcon />
                        Edit
                    </NavLink>
                </Button>
            </div>
        ),
    },
];