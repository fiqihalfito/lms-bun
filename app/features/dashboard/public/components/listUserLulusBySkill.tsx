import type { DashboardService } from "../services/DashboardService"
import { TableWrapper } from "@/components/table-wrapper";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import { TrashIcon, XIcon } from "lucide-react";


type UserLulusSkillProp = {
    data: Awaited<ReturnType<typeof DashboardService.getNamaUserLulusBySkill>>["levelGroup"]
}

export function ListUserLulusBySkill({ data }: UserLulusSkillProp) {

    if (data.length === 0) {
        return <p>Belum ada yang lulus</p>
    }

    return (
        <div className="flex flex-col gap-10 mt-16">
            {data.map((item, i) => (
                <div key={i}>
                    <p className="text-lg ml-1 font-medium mb-1.5">Level {item.level}</p>
                    {item.userLulusSkill.length > 0 ? (
                        <TableWrapper>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[100px]">No</TableHead>
                                        <TableHead>Nama User</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {item.userLulusSkill.map((user, j) => (
                                        <TableRow key={j}>
                                            <TableCell className="font-medium">{j + 1}</TableCell>
                                            <TableCell>{user.namaUser}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableWrapper>
                    ) : (
                        <EmptyList />
                    )}
                </div>
            ))}
        </div>
    )
}



export function EmptyList() {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <XIcon />
                </EmptyMedia>
                <EmptyTitle>Belum ada yang lulus</EmptyTitle>
                <EmptyDescription>
                    Belum ada yang lulus skill di level ini
                </EmptyDescription>
            </EmptyHeader>
            {/* <EmptyContent>
                <Button variant="outline" size="sm">
                    Upload Files
                </Button>
            </EmptyContent> */}
        </Empty>
    )
}
