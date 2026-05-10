import { getToast } from "remix-toast";
import type { Route } from "./+types/private";
import { Await, data } from "react-router";
import { useToastEffect } from "@/hooks/use-toast";
import { userContext } from "@/lib/context";
import { UserProfile } from "@/features/dashboard/private/components/UserProfile";
import { DashboardService } from "@/features/dashboard/private/services/DashboardService";
import { TeamService } from "@/features/team/services/TeamService";
import { UserProfileService } from "@/features/user/services/UserProfileService";
import { UserResultSkills } from "@/features/dashboard/private/components/UserResultSkills";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserResultSkillsSkeleton } from "@/features/dashboard/private/components/UserResultSkillsSkeleton";

export async function loader({ request, params, context }: Route.LoaderArgs) {
  const user = context.get(userContext);

  // source data
  const userResultSkills = DashboardService.getUserResultSkills(user.idUser)


  // accesories
  const [currentTeam, userProfile] = await Promise.all([
    TeamService.getTeamByIdUser(user.idUser),
    UserProfileService.getUserProfileByIdUser(user.idUser),
  ])

  const { toast, headers } = await getToast(request);
  return data({ toast, userProfile, currentTeam, userResultSkills }, { headers });
}

export default function DashboardRoute({ loaderData }: Route.ComponentProps) {
  const { toast, userProfile, currentTeam, userResultSkills } = loaderData;

  useToastEffect(toast);

  return (
    <div>
      {/* <HeaderRoute title="Dashboard" description="Melihat status terkini progress dokumen" /> */}
      <UserProfile userProfile={userProfile} currentTeam={currentTeam} />
      {/* <pre>{JSON.stringify(skillStatePrivate, null, 2)}</pre> */}

      <div className="mb-2">
        <h2 className="text-xl font-semibold text-black/60">{currentTeam?.namaTeam} Skill Progress</h2>
      </div>
      <Suspense fallback={<UserResultSkillsSkeleton />}>
        <Await resolve={userResultSkills}>
          {(resolvedUserResultSkills) => (
            <UserResultSkills data={resolvedUserResultSkills} />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
