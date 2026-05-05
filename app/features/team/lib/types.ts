import type { TeamService } from "../services/TeamService";

export type { loader as loaderGetTeamAll } from "../loaders/get-team-all";

export type TeamData = Awaited<
  ReturnType<typeof TeamService.getTeamsAll>
>[number];
