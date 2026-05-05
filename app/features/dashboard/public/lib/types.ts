import type { DashboardService } from "../services/DashboardService";

export type UserDataForIndicatorDetail = Awaited<
  ReturnType<typeof DashboardService.getUserSkillIndicator>
>;
