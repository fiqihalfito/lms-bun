import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import type { getTeamsAll } from "../../services/get-teams-all";

export const TeamsColumns: ColumnDef<Awaited<ReturnType<typeof getTeamsAll>>[number]>[] = [
    {
        id: "nomor",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "namaTeam",
        header: "Nama Team",
    },
    {
        id: "action",
        header: () => <div className="text-right">Aksi</div>,
        cell: ({ row }) => (
            <div className="flex justify-end gap-x-1">
                <Button asChild size="sm">
                    <NavLink to={`${row.original.idTeam}/edit`}>
                        <PencilIcon />
                        Edit
                    </NavLink>
                </Button>
            </div>
        ),
    },
];