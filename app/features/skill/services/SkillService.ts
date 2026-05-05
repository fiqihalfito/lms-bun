import { SkillQuery } from "../repo/SkillQuery";

export abstract class SkillService {
  static async getNamaSkillByIdSkill(idSkill: string) {
    const namaSkill = await SkillQuery.findNamaSkillById(idSkill);
    return namaSkill;
  }

  static async getSkillAndStats(idUser: string, idTeam: string) {
    const skillAndStats = await SkillQuery.findSkillAndStats(idUser, idTeam);
    return skillAndStats;
  }

  static async getSkillProgressDetailByIdSkill(idSkill: string, idPic: string) {
    const skillProgressDetail =
      await SkillQuery.findSkillProgressDetailByIdSkill(idSkill, idPic);
    return skillProgressDetail;
  }

  static async getSkillsByIdTeam(idTeam: string) {
    const skills = await SkillQuery.findSkillsByIdTeam(idTeam);
    return skills;
  }
}
