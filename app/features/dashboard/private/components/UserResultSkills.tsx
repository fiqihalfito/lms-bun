import { TableWrapper } from "@/components/table-wrapper"
import type { DashboardService } from "../services/DashboardService"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"


type UserResultSkillsProp = {
    data: Awaited<ReturnType<typeof DashboardService.getUserResultSkills>>
}

export function UserResultSkills({ data }: UserResultSkillsProp) {

    if (!data) return (
        <div>Datanya kosong</div>
    )
    return (
        <div className="flex flex-col gap-12 border shadow-lg p-8 rounded-lg">
            {data.map((item) => (
                <div key={item.idSkill}>
                    <h4 className="text-base font-semibold mb-2">{item.namaSkill}</h4>
                    <div>
                        <TableWrapper className="shadow-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {/* <TableHead className="w-[100px]">No</TableHead> */}
                                        <TableHead>Level</TableHead>
                                        <TableHead>Jumlah Subskill</TableHead>
                                        <TableHead className="text-center">Sudah Baca</TableHead>
                                        <TableHead className="text-center">Lulus Kuis</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {item.groupLevel.map((itemLevel, index) => (
                                        <TableRow key={`${item.idSkill}-${itemLevel.level}`} className="font-semibold">
                                            {/* <TableCell className="font-medium">{index + 1}</TableCell> */}
                                            <TableCell className="">Level {itemLevel.level}</TableCell>
                                            <TableCell>{itemLevel.jumlahSubskill}</TableCell>
                                            <TableCell className={cn("text-center text-white", itemLevel.sudahBaca === itemLevel.jumlahSubskill ? "bg-green-500 " : "bg-red-500 ")}>{itemLevel.sudahBaca}</TableCell>
                                            <TableCell className={cn("text-center text-white", itemLevel.lulusKuis === itemLevel.jumlahSubskill ? "bg-green-500 " : "bg-red-500 ")}>{itemLevel.lulusKuis}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableWrapper>

                    </div>
                </div>
            ))}
        </div>
    )
}