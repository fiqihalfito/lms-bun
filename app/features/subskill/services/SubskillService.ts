import invariant from "tiny-invariant";
import { SubskillQuery } from "../repo/SubskillQuery";
import type { mSubSkill } from "database/schema";
import { SubskillMutation } from "../repo/SubskillMutation";

export abstract class SubskillService {
  static async getSubskillByIdWithSkill(idSubskill: string) {
    const data = await SubskillQuery.findByIdWithSkill(idSubskill);
    invariant(data, "Subskill not found");
    return data;
  }

  static async getSubskillByIdSkill(idSkill: string) {
    const data = await SubskillQuery.findSubskillByIdSkill(idSkill);
    invariant(data.length > 0, "Subskills not found");
    return data;
  }

  static async getIdDokumenByIdSubSkill(idSubSkill: string) {
    return await SubskillQuery.findIdDokumenByIdSubSkill(idSubSkill);
  }

  static async getSubskillByIdSkillAndLevel(
    idSkill: string,
    level: number,
    idPembaca: string,
  ) {
    const data = await SubskillQuery.findByIdSkillAndLevel(
      idSkill,
      level,
      idPembaca,
    );
    return data;
  }

  static async getSubskillStatPerLevel(
    idSkill: string,
    level: number,
    idUser: string,
  ) {
    const data = await SubskillQuery.findSubskillStatPerLevel(
      idSkill,
      level,
      idUser,
    );
    return data;
  }

  static async getLevelSubskillListDataByIdSkill(
    skillId: string,
    userId: string,
  ) {
    const data = await SubskillQuery.findLevelSubskillListDataByIdSkill(
      skillId,
      userId,
    );
    return data;
  }

  static async getSkillsByIdPicSubSkill(idPic: string) {
    const data = await SubskillQuery.findSkillsByIdPicSubSkill(idPic);
    return data;
  }

  static async getSubSkillByIdPIC(idPIC: string, idSkill: string) {
    const data = await SubskillQuery.findSubSkillByIdPIC(idPIC, idSkill);

    const levels = Array.from(new Set(data.map((item) => item.level)));
    const mappedSubskills = levels.map((level) => {
      return {
        level,
        subskills: data.filter((item) => item.level === level),
      };
    });

    return mappedSubskills;
  }

  static async getSkillProgressDetailByIdSkill(idSkill: string, idPic: string) {
    const data = await SubskillQuery.findSkillProgressDetailByIdSkill(
      idSkill,
      idPic,
    );
    return data;
  }

  static async editSubskill(
    idSubskill: string,
    data: Partial<typeof mSubSkill.$inferInsert>,
  ) {
    await SubskillMutation.updateSubskill(idSubskill, data);
  }
}
