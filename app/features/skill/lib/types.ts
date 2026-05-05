import type { SkillService } from "../services/SkillService";

export type GroupLevelType = Record<
  string,
  {
    jumlahSubskill: number;
    sudahBaca: number;
    lulusKuis: number;
  }
>;

export type SkillDataWithTeam = Awaited<
  ReturnType<typeof SkillService.getSkillsByIdTeam>
>;

export type SkillDataWithTeamItem = SkillDataWithTeam[number];

export type SkillStatCardDataItem = Awaited<
  ReturnType<typeof SkillService.getSkillAndStats>
>[number];
