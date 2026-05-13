import type { ColumnDef } from "@tanstack/react-table";
import type { UserPICSubskillService } from "../../services/UserPICSubskill";
import { PICDeleteButton } from "../../components/master-view/pic-delete-button";
import { cn } from "@/lib/utils";

export const userPicColumns: ColumnDef<
    Awaited<ReturnType<typeof UserPICSubskillService.getPICSubskill>>[number]
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
            accessorKey: "jumlahSubskill",
            header: "Jumlah Subskill",
            cell: ({ row }) => {
                const isZero = row.original.jumlahSubskill === 0;
                return (
                    <div className={cn("font-semibold", isZero && "text-red-500")}>
                        {row.original.jumlahSubskill}
                    </div>
                );
            },
        },
        {
            id: "action",
            header: () => <div className="text-right">Aksi</div>,
            cell: ({ row }) => (
                <div className="flex justify-end gap-x-1">
                    <PICDeleteButton idUser={row.original.idUser} />
                </div>
            ),
        },
    ];
