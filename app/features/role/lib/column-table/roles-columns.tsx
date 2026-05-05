import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import type { RoleService } from "../../services/RoleService";

export const RolesColumns: ColumnDef<
  Awaited<ReturnType<typeof RoleService.getAllRole>>[number]
>[] = [
    {
      id: "nomor",
      header: "No",
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "namaRole",
      header: "Nama Role",
    },
    {
      id: "action",
      header: () => <div className="text-right">Aksi</div>,
      cell: ({ row }) => (
        <div className="flex justify-end gap-x-1">
          <Button asChild size="sm">
            <NavLink to={`${row.original.idRole}/edit`}>
              <PencilIcon />
              Edit
            </NavLink>
          </Button>
        </div>
      ),
    },
  ];
