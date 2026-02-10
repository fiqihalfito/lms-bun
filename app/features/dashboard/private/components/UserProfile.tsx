import {
    User,
    Calendar,
    Briefcase,
    Users,
    Clock,
    ShieldCheck
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type UserProfileProps = {
    // Menggunakan tipe data yang kamu berikan
    userProfile: {
        idUser: string;
        updated_at: string | null;
        created_at: string;
        deleted_at: string | null;
        namaUser: string;
        idSubBidang: string | null;
        team: {
            idSubBidang: string | null;
            idTeam: string;
            namaTeam: string | null;
        }[];
        subBidang: {
            idSubBidang: string;
            namaSubBidang: string | null;
        } | null;
    };
};

export function UserProfile({ userProfile }: UserProfileProps) {
    const initials = userProfile.namaUser
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    return (
        <div className="border shadow rounded-lg p-8 mb-6 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground font-bold">
                        {initials}
                    </AvatarFallback>
                </Avatar>

                <div className="space-y-2 text-center md:text-left">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            {userProfile.namaUser}
                        </h1>
                        {/* <p className="text-sm text-muted-foreground font-mono">
                            ID: {userProfile.idUser}
                        </p> */}
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {userProfile.subBidang ? (
                            <Badge variant="secondary" className="px-3 py-1 flex gap-1.5 items-center">
                                <Briefcase className="w-3.5 h-3.5" />
                                {userProfile.subBidang.namaSubBidang}
                            </Badge>
                        ) : (
                            <Badge variant="outline">Tanpa Bidang</Badge>
                        )}
                        <Badge variant="outline" className="px-3 py-1 flex gap-1.5 items-center">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                            Active Member
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Teams Section */}
                <Card className="md:col-span-2 overflow-hidden border shadow-md p-0">
                    <CardHeader className="bg-slate-900 text-white p-4">
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5" />
                            <CardTitle>Team Assignments</CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">
                            Daftar tim yang diikuti oleh user ini
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="">
                        <div className="divide-y divide-slate-100">
                            {userProfile.team.length > 0 ? (
                                userProfile.team.map((t) => (
                                    <div key={t.idTeam} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors border rounded-2xl shadow">
                                        <div className="space-y-1">
                                            <p className="font-semibold text-slate-800">{t.namaTeam || "Unnamed Team"}</p>
                                            {/* <p className="text-xs text-muted-foreground uppercase tracking-wider">ID: {t.idTeam}</p> */}
                                        </div>
                                        <Badge variant="outline" className="text-[10px]">MEMBER</Badge>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">
                                    User belum terdaftar di tim manapun.
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Metadata Section */}
                <Card className="border-none shadow-md">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            <CardTitle className="text-lg">Aktivitas Akun</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase">Dibuat pada</p>
                                    <p className="text-sm font-semibold italic text-slate-700">
                                        {new Date(userProfile.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'long', year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex items-start gap-3">
                                <Clock className="w-4 h-4 mt-0.5 text-muted-foreground" />
                                <div>
                                    <p className="text-xs font-medium text-slate-500 uppercase">Pembaruan Terakhir</p>
                                    <p className="text-sm font-semibold italic text-slate-700">
                                        {userProfile.updated_at
                                            ? new Date(userProfile.updated_at).toLocaleDateString('id-ID', {
                                                day: 'numeric', month: 'long', year: 'numeric'
                                            })
                                            : "Belum pernah diperbarui"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}