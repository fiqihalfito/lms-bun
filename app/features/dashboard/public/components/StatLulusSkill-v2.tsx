import type { DashboardService } from "../services/DashboardService"
import { TableWrapper } from "@/components/table-wrapper"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router"
import { ArrowUpRightIcon } from "lucide-react"

type StatLulusSkillProp = {
    teamStat: Awaited<ReturnType<typeof DashboardService.getJumlahLulusPerSkillV2>>
}

export function StatLulusSkillV2({ teamStat }: StatLulusSkillProp) {
    return (
        <div className="mb-20">
            <h1 className="text-3xl font-bold tracking-tight mb-12">Total Lulus Skill</h1>
            <div className="flex flex-col gap-16">
                {teamStat?.map((team) => (
                    <div key={team.namaTeam} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold ml-2">{team.namaTeam}</h3>
                            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-1 rounded border-2 ">
                                <span className="font-black tabular-nums">{team.jumlahAnggota}</span> Anggota Tim
                            </p>
                        </div>
                        <TableWrapper>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Skill</TableHead>
                                        {
                                            Array.from({ length: team.maxLevel }).map((_, i) => (
                                                <TableHead key={i}>Level {i + 1}</TableHead>
                                            ))
                                        }
                                        <TableHead>Jumlah Member</TableHead>
                                        <TableHead className="text-right">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {team.skill.map((skill, i) => {

                                        return (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{skill.namaSkill}</TableCell>
                                                {
                                                    Array.from({ length: team.maxLevel }).map((_, j) => {
                                                        const level = skill.levelEnumMap[j]
                                                        return (
                                                            <TableCell key={j}>{level?.jumlahUserLulus ?? "-"}</TableCell>
                                                        )
                                                    })
                                                }
                                                <TableCell>{team.jumlahAnggota}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button size={"sm"} asChild>
                                                        <NavLink to={`${skill.idSkill}`} >
                                                            Selengkapnya
                                                            <ArrowUpRightIcon />
                                                        </NavLink>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableWrapper>
                    </div>
                ))}
            </div>
        </div>

    )
}