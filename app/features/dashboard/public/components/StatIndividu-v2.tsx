import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowUpRightIcon, XIcon } from "lucide-react";
import type { DashboardService } from "../services/DashboardService";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TableWrapper } from "@/components/table-wrapper";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router";

interface StatIndividuProps {
    listIndividuSkillData: Awaited<ReturnType<typeof DashboardService.getListIndividuSkill_V2>>
}

export function StatIndividuV2({ listIndividuSkillData }: StatIndividuProps) {
    return (
        <div className="mb-20 space-y-6">


            {listIndividuSkillData.length === 0 && <EmptyList />}

            {listIndividuSkillData.length > 0 && (
                <TableWrapper>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">No</TableHead>
                                <TableHead>Nama</TableHead>
                                <TableHead>Skill</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listIndividuSkillData.map((user, index) => (
                                <TableRow key={user.idUser}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{user.namaUser}</TableCell>
                                    <TableCell className="">
                                        {user.skills.length === 0 ? (
                                            <span className="h-full w-full  flex items-center text-xs text-muted-foreground italic">
                                                Belum lulus Skill
                                            </span>
                                        ) : (
                                            // user.skills.map((skill, index) => (
                                            //     <Badge key={index} variant="outline" className="w-52">
                                            //         {skill.namaSkill} • Level {skill.highestLevelAndLulus}
                                            //     </Badge>
                                            // ))
                                            <div className="flex flex-wrap gap-2">
                                                {user.skills.map((skill, index) => (
                                                    <Badge key={index} variant="outline" className="w-52 shadow-md">
                                                        {skill.namaSkill} • Level {skill.highest}
                                                    </Badge>
                                                ))}
                                                {/* {Array.from({ length: 18 }).map((_, index) => (
                                                    <Badge key={index} variant="outline" className="w-52 ">
                                                        Skill {index + 1}
                                                    </Badge>
                                                ))} */}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size={"sm"} asChild>
                                            <NavLink to={`/dashboard/stat-individu/${user.idUser}`} key={user.idUser}>
                                                Selengkapnya
                                                <ArrowUpRightIcon />
                                            </NavLink>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableWrapper>
            )}

        </div>
    );
}

function EmptyList() {
    return (
        <Empty className="border border-dashed">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <XIcon />
                </EmptyMedia>
                <EmptyTitle>Tidak ada data</EmptyTitle>
                <EmptyDescription>
                    Belum ada yang lulus skill itu
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                {/* <Button variant="outline" size="sm">
                    Upload Files
                </Button> */}
            </EmptyContent>
        </Empty>
    )
}
