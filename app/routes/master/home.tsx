import { HeaderRoute } from "@/components/header-route";
import type { Route } from "./+types/home";
import { DashboardAdminService } from "@/features/dashboard/admin/services/DashboardAdminService";
import { TableWrapper } from "@/components/table-wrapper";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export async function loader({ request, params, context }: Route.LoaderArgs) {

    // data PIC yang telah upload dan membuat kuis
    const picUploadStatus = await DashboardAdminService.getPicUploadStatus()

    return { picUploadStatus }
}

export default function MasterHome({ loaderData }: Route.ComponentProps) {

    const { picUploadStatus } = loaderData

    // return <pre>{JSON.stringify(picUploadStatus, null, 2)}</pre>

    const getLevelStats = (subSkills: typeof picUploadStatus[number]["subSkill"], level: number) => {
        const total = subSkills.filter((s) => s.level === level).length;
        const uploaded = subSkills.filter((s) => s.level === level && s.idDokumen !== null).length;
        const kuis = subSkills.filter((s) => s.level === level && s.kuis !== null && s.kuis.jumlahSoal > 0).length;
        const isCompleteUploaded = uploaded === total;
        const isCompleteKuis = kuis === total;

        return {
            label: <>
                <span className={cn(isCompleteUploaded ? "text-green-500" : "text-red-500")}>{uploaded}/{total} dok</span>
                <span> - </span>
                <span className={cn(isCompleteKuis ? "text-green-500" : "text-red-500")}>{kuis}/{total} kuis</span>
            </>,
        };
    };

    return (
        <div>
            <HeaderRoute title="Dashboard PIC" description="Status Upload Dokumen dan Kuis" />


            <TableWrapper>
                <Table>
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">No</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead className="text-center">Level 1</TableHead>
                            <TableHead className="text-center">Level 2</TableHead>
                            <TableHead className="text-center">Level 3</TableHead>
                            <TableHead className="text-center">Level 4</TableHead>
                            <TableHead className="text-right">Jumlah Subskill</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {picUploadStatus.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>{item.namaUser}</TableCell>
                                {[1, 2, 3, 4].map((level) => {
                                    const { label } = getLevelStats(item.subSkill, level);
                                    return (
                                        <TableCell key={level} className={"font-semibold text-center"}>
                                            {label}
                                        </TableCell>
                                    );
                                })}
                                <TableCell className="text-right">{item.jumlahSubskill}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableWrapper>
        </div>
    )
}