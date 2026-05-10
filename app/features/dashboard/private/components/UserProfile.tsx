import { Briefcase } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { UserProfileService } from "@/features/user/services/UserProfileService";
import type { TeamService } from "@/features/team/services/TeamService";

type UserProfileProps = {
  // Menggunakan tipe data yang kamu berikan
  userProfile: Awaited<
    ReturnType<typeof UserProfileService.getUserProfileByIdUser>
  >;
  currentTeam: Awaited<
    ReturnType<typeof TeamService.getTeamByIdUser>
  >;
};

export function UserProfile({ userProfile, currentTeam }: UserProfileProps) {
  const initials = userProfile.namaUser
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const displayTeam = currentTeam ? currentTeam.namaTeam : "tidak masuk team manapun";

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
              <Badge
                variant="secondary"
                className="px-3 py-1 flex gap-1.5 items-center"
              >
                <Briefcase className="w-3.5 h-3.5" />
                {userProfile.subBidang.namaSubBidang}
              </Badge>
            ) : (
              <Badge variant="outline">Tanpa Bidang</Badge>
            )}
          </div>
          <Badge>
            {displayTeam}
          </Badge>
        </div>
      </div>


    </div >
  );
}
