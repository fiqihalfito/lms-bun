import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { BanIcon, EyeIcon, FileUpIcon, PencilIcon } from "lucide-react";
import { NavLink } from "react-router";
import { Badge } from "@/components/ui/badge";
import type { getSubSkillByIdPIC } from "../../services/getSubSkillByIdPIC";
import { UploadDokumenDirectButton } from "@/features/dokumen/components/subskill/upload-dokumen-button";

export const picSubSkillColumns: ColumnDef<Awaited<ReturnType<typeof getSubSkillByIdPIC>>[number]["subskills"][number]>[] = [
    {
        id: "nomor",
        header: "No",
        cell: ({ row }) => row.index + 1,
    },
    {
        accessorKey: "namaSubSkill",
        header: "Nama SubSkill",
    },
    // {
    //     id: "status-baca",
    //     header: "Status Baca",
    //     accessorFn: (row) => row.pembaca?.created_at,
    //     cell: ({ getValue }) => {
    //         const date = getValue<string | Date | null>();
    //         return date ? (
    //             <Badge className="bg-green-600 hover:bg-green-600">
    //                 Done : {new Date(date).toLocaleString("id-ID")}
    //             </Badge>
    //         ) : (
    //             <Badge variant="destructive">Not yet</Badge>
    //         );
    //     },
    // },
    // {
    //     id: "terakhir-baca",
    //     header: "Terakhir Baca",
    //     accessorFn: (row) => row.pembaca?.updated_at,
    //     cell: ({ getValue }) => {
    //         const date = getValue<string | Date | null>();
    //         return date ? (
    //             <Badge variant={"secondary"}>
    //                 {new Date(date).toLocaleString("id-ID")}
    //             </Badge>
    //         ) : (
    //             <Badge variant="destructive">Not yet</Badge>
    //         );
    //     },
    // },
    {
        id: "pic",
        header: "PIC",
        accessorFn: (row) => row.pic?.namaUser,
        cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
        id: "level",
        header: "Level",
        accessorFn: (row) => row.level,
        cell: ({ getValue }) => getValue<number>() ?? "-",
    },
    {
        id: "sudah-upload",
        header: "Sudah Upload",
        accessorFn: (row) => row.idDokumen,
        cell: ({ getValue }) => {
            // const date = getValue<string | Date | null>();
            // return date ? (
            //     <Badge variant={"secondary"}>
            //         {new Date(date).toLocaleString("id-ID")}
            //     </Badge>
            // ) : (
            //     <Badge variant="destructive">Not yet</Badge>
            // );
            const idDokumen = getValue<string | Date | null>();
            return idDokumen ? (
                <Badge variant={"default"}>
                    Done
                </Badge>
            ) : (
                <Badge variant="destructive">Not yet</Badge>
            );

        },
    },
    {
        id: "sudah-kuis",
        header: "Kuis",
        accessorFn: (row) => row.idKuis,
        cell: ({ getValue }) => {
            // const date = getValue<string | Date | null>();
            // return date ? (
            //     <Badge variant={"secondary"}>
            //         {new Date(date).toLocaleString("id-ID")}
            //     </Badge>
            // ) : (
            //     <Badge variant="destructive">Not yet</Badge>
            // );
            const idKuis = getValue<string | Date | null>();
            return idKuis ? (
                <Badge variant={"default"}>
                    Done
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
                {/* <Button asChild size="sm">
                    <NavLink to={`/app/subskill/baca/${row.original.idSubSkill}`}>
                        <FileUpIcon />
                        Upload
                    </NavLink>
                </Button> */}
                <UploadDokumenDirectButton idSubSkill={row.original.idSubSkill} idDokumen={row.original.idDokumen} />
                {row.original.idDokumen ? (
                    <Button variant="secondary" asChild size="sm">
                        <NavLink to={`${row.original.idSubSkill}/make-kuis`}>
                            <PencilIcon />
                            Buat Kuis
                        </NavLink>
                    </Button>
                ) : (
                    <Button variant="secondary" disabled size="sm">
                        <BanIcon />
                        Upload dokumen dulu
                    </Button>
                )}
            </div>
        ),
    },
];