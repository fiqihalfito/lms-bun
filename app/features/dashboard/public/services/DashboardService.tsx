import { DashboardQuery } from "../repo/DashboardQuery";
import * as R from "remeda";

export abstract class DashboardService {
  static async getJumlahLulusPerSkill(idSubBidang?: string) {
    const data = await DashboardQuery.findJumlahLulusPerSkill(idSubBidang);

    const mappingRes = R.pipe(
      data,
      R.groupBy((x) => x.namaTeam ?? "other_team"),
      R.entries(),
      R.map(([namaTeam, items]) => ({
        namaTeam,
        jumlahOrangPerTeam: items[0].jumlahOrangPerTeam,
        skill: items.map((item) => ({
          namaSkill: item.namaSkill,
          jumlahLulus: item.jumlahLulus,
        })),
      })),
    );

    return mappingRes;
  }

  static async getListIndividuSkill(idSubBidang?: string) {
    const data = await DashboardQuery.findListIndividuSkill(idSubBidang);

    const mappingRes = R.pipe(
      data,
      R.groupBy((x) => x.namaTeam ?? "other_team"),
      R.entries(),
      R.map(([namaTeam, membersData]) => ({
        namaTeam,
        users: R.pipe(
          membersData,
          R.groupBy((member) => member.namaUser),
          R.entries(),
          R.map(([namaUser, listCurrSkills]) => ({
            namaUser,
            idUser: listCurrSkills[0].idUser,
            skills: listCurrSkills.map((skill) => ({
              namaSkill: skill.namaSkill,
              level: skill.level,
            })),
          })),
        ),
      })),
    );

    return mappingRes;
  }

  static async getUserSkillIndicator(idUser: string) {
    const data = await DashboardQuery.findUserSkillIndicator(idUser);

    const skillGroup = R.groupBy(
      data,
      (item) => item.namaSkill ?? "other_skill",
    );

    const skills = Object.entries(skillGroup).map(([namaSkill, items]) => {
      const levelGroup = R.groupBy(items, (item) => item.levelSubskill ?? 0);

      const levels = Object.entries(levelGroup).map(([level, subskills]) => ({
        level: Number(level),
        subskills: subskills.map((s) => ({
          namaSubskill: s.namaSubSkill,
          isLulus: s.isLulus,
          isBaca: s.isBaca,
        })),
      }));

      return { namaSkill, levels };
    });

    const output = {
      namaTeam: data[0].namaTeam,
      namaUser: data[0].namaUser,
      skills,
    };

    return output;
  }
}
