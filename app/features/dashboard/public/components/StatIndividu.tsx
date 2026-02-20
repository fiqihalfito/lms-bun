import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Database, Terminal, Star } from "lucide-react";
import { Separator } from '@/components/ui/separator';

interface Skill {
    namaSkill: string | null;
    level: number | null;
}

interface UserData {
    namaUser: string;
    skills: Skill[];
}

interface TeamData {
    namaTeam: string;
    users: UserData[];
}

interface StatIndividuProps {
    statIndividuData: TeamData[];
}

export function StatIndividu({ statIndividuData }: StatIndividuProps) {
    return (
        <div className="mt-10 mb-20 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Statistik Individu</h1>
                <Badge variant="outline" className="px-3 py-1">
                    Total {statIndividuData.reduce((acc, team) => acc + team.users.length, 0)} Personil
                </Badge>
            </div>

            <Tabs defaultValue={statIndividuData[0]?.namaTeam} className="w-full">
                <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
                    {statIndividuData.map((team) => (
                        <TabsTrigger key={team.namaTeam} value={team.namaTeam} className="capitalize">
                            {team.namaTeam === 'DBA' ? <Database className="w-4 h-4 mr-2" /> : <Terminal className="w-4 h-4 mr-2" />}
                            {team.namaTeam}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {statIndividuData.map((team) => (
                    <TabsContent key={team.namaTeam} value={team.namaTeam}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {team.users.map((user, idx) => (
                                <Card key={idx} className="overflow-hidden hover:border-primary/50 transition-colors">
                                    <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarFallback className="bg-primary/5 text-primary text-xs">
                                                {user.namaUser.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <CardTitle className="text-sm font-medium leading-none">
                                                {user.namaUser}
                                            </CardTitle>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {team.namaTeam} Specialist
                                            </p>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {user.skills.some(s => s.namaSkill) ? (
                                                user.skills.map((skill, sIdx) => (
                                                    skill.namaSkill && (
                                                        <Badge key={sIdx} variant="outline">
                                                            {skill.namaSkill}
                                                            <Separator orientation="vertical" />
                                                            <div className="flex ml-1">
                                                                level {skill.level}
                                                            </div>
                                                        </Badge>
                                                    )
                                                ))
                                            ) : (
                                                <span className="text-[10px] italic text-muted-foreground">Belum ada skill yang lulus   </span>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}