import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import type { UserProfileService } from "../../services/UserProfileService";

export const userColumns: ColumnDef<
  Awaited<ReturnType<typeof UserProfileService.getAllUserWithFilter>>[number]
>[] = [
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
      id: "team",
      header: "Team",
      cell: ({ row }) => {
        if (row.original.team?.namaTeam) {
          return row.original.team.namaTeam;
        }

        return "-";
      },
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
