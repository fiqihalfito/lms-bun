import type { DashboardService } from "../services/DashboardService";

export type UserDataForIndicatorDetail = Awaited<
  ReturnType<typeof DashboardService.getUserSkillIndicator>
>;

export type UserSkillAchived = Awaited<
  ReturnType<typeof DashboardService.getListIndividuSkillSingle>
>;
