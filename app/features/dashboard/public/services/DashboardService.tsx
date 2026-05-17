import { db } from "database/connect.server";
import { DashboardQuery } from "../repo/DashboardQuery";
import * as R from "remeda";
import { mSkill, mSubSkill, mTeamMember, mUserProfiles } from "database/schema";
import { eq, sql } from "drizzle-orm";
import { sortedListIndividuSkillV2 } from "../lib/utils";

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

  static async getJumlahLulusPerSkillV2(idSubBidang?: string) {
    const raw = await db.query.mTeam.findMany({
      where: {
        idSubBidang: idSubBidang,
      },
      columns: {
        idTeam: true,
        namaTeam: true
      },
      with: {
        skill: {
          columns: {
            idSkill: true,
            idTeam: true,
            namaSkill: true,
          },
          orderBy: {
            namaSkill: "asc"
          },
          with: {
            userProfiles: {
              columns: {
                idUser: true,
                namaUser: true
              },
              with: {
                kuisProgress: {
                  columns: {
                    idKuis: true,
                    idKuisProgress: true,
                    totalScore: true,
                    jumlahSoal: true,
                  },
                  with: {
                    skill: {
                      columns: {
                        idSkill: true,
                        namaSkill: true,
                      }
                    },
                    subskill: {
                      columns: {
                        idSubSkill: true,
                        level: true,
                      }
                    }
                  },
                  where: {
                    RAW: (table) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80`,
                  },
                },
              },
            },
            subSkill: {
              columns: {
                idSkill: true,
                idSubSkill: true,
                level: true,
              },
              orderBy: {
                idSubSkill: "asc",
                level: "asc"
              }
            }
          },
        },
      },
      extras: {
        jumlahAnggota: (table) => db.$count(mTeamMember, eq(mTeamMember.idTeam, table.idTeam))
      }
    })



    const res = raw.map((team) => {

      const skillMap = team.skill.map((skill) => {
        const levelEnum = [...new Set(skill.subSkill.map((subSkill) => subSkill.level))].sort((a, b) => a - b)
        const levelEnumMap = levelEnum.map((level) => {
          return {
            level,
            jumlahSubskillPerLevel: skill.subSkill.filter((subSkill) => subSkill.level === level).length,
            jumlahUserLulus: 0
          }
        })
        for (let i = 0; i < levelEnumMap.length; i++) {
          const itemLevel = levelEnumMap[i];

          for (let j = 0; j < skill.userProfiles.length; j++) {
            const user = skill.userProfiles[j];

            const jumlahLulusKuisPerPeserta = user.kuisProgress.filter((kuisProgress) => kuisProgress.subskill?.level === itemLevel.level && kuisProgress.skill?.idSkill === skill.idSkill)
            if (jumlahLulusKuisPerPeserta.length >= itemLevel.jumlahSubskillPerLevel) {
              itemLevel.jumlahUserLulus++
            }
          }
        }
        return {
          namaSkill: skill.namaSkill,
          idSkill: skill.idSkill,
          jumlahLevel: levelEnum.length,
          levelEnumMap
        }
      })

      const maxLevel = skillMap.reduce((acc, curr) => {
        return Math.max(acc, curr.jumlahLevel)
      }, 0)

      return {
        namaTeam: team.namaTeam,
        jumlahAnggota: team.jumlahAnggota,
        skill: skillMap,
        maxLevel: maxLevel
      }
    })

    return res
  }

  static async getNamaUserLulusBySkill(idSkill: string) {
    const raw = await db.query.mSkill.findFirst({
      where: { idSkill: idSkill },
      with: {
        kuisProgress: {
          where: { RAW: (table) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80` },
          columns: {
            idUser: true,
            idKuisProgress: true,
            jumlahSoal: true,
            totalScore: true,
            idKuis: true
          },
          with: {
            user: {
              columns: {
                namaUser: true,
                idUser: true
              }
            },
            subskill: {
              columns: {
                level: true,
                idSubSkill: true
              }
            }
          },
        },
      },
    })




    if (!raw) {
      return { namaSkill: "", levelGroup: [] }
    }

    const jumlahSubskillPerLevel = await db.select({
      level: mSubSkill.level,
      jumlah: sql<number>`cast(count(${mSubSkill.idSubSkill}) as int)`
    }).from(mSubSkill)
      .where(eq(mSubSkill.idSkill, idSkill))
      .groupBy(mSubSkill.level)
      .orderBy(mSubSkill.level)

    const levelGroup = jumlahSubskillPerLevel.map((item) => {

      const userGroup = R.groupBy(raw.kuisProgress, (item) => item.user?.namaUser)
      const userLulusSkill = Object.entries(userGroup).map(([namaUser, kuisProgress], i) => {

        const jumlahKuisLulusPerLevel = kuisProgress.filter((kuisProgress) => kuisProgress.subskill?.level === item.level)
        const isLulusLevelIni = jumlahKuisLulusPerLevel.length === item.jumlah
        return {
          namaUser,
          idUser: kuisProgress[0].idUser,
          lulusDiLevelIni: isLulusLevelIni,
          jumlahLulusKuis: jumlahKuisLulusPerLevel.length,
          jumlahLevelTarget: item.jumlah
        }
      }).filter((item) => item.lulusDiLevelIni)

      return {
        level: item.level,
        userLulusSkill
      }
    })


    return {
      namaSkill: raw.namaSkill,
      levelGroup
    }
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

  static async getListIndividuSkill_V2(idSubBidang: string, filter?: { skill?: string | null }) {

    const data = await db.query.mUserProfiles.findMany({
      columns: {
        idUser: true,
        namaUser: true
      },
      with: {
        kuisProgress: {
          where: {
            RAW: (table) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80`,
          },
          columns: {
            idUser: true,
            idKuisProgress: true,
            jumlahSoal: true,
            totalScore: true,
            idKuis: true
          },
          with: {
            skill: {
              columns: {
                idSkill: true,
                namaSkill: true,
              }
            },
            subskill: {
              columns: {
                idSubSkill: true,
                level: true,
              }
            }
          }
        },
      },
      where: {
        idSubBidang: idSubBidang,
        team: true
        // idUser: "c5c966fa-5081-462f-b0d5-493addfe7131"
        // idUser: "4d242348-3f78-47a0-9282-b0ecd9ccbb66"
      },
      orderBy: {
        namaUser: "asc"
      }
    })


    const levelGroup = await db.select({
      idSkill: mSkill.idSkill,
      namaSkill: mSkill.namaSkill,
      level: mSubSkill.level,
      jumlahSubskillPerLevel: sql<number>`count(*)`
        .mapWith(Number)
        .as("jumlahSubskillPerLevel")
    }).from(mSkill)
      .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
      .groupBy(mSkill.idSkill, mSkill.namaSkill, mSubSkill.level)
      .orderBy(mSkill.namaSkill, mSubSkill.level)

    const res = data.map((user) => {
      const groupedSkillJSON = R.groupBy(user.kuisProgress, (item) => item.skill?.namaSkill)
      const groupedSkill = Object.entries(groupedSkillJSON).map(([namaSkill, kuisProgress]) => {

        const groupedLevelKuisProgressJSON = R.groupBy(kuisProgress, (item) => item.subskill?.level)
        const groupedLevelKuisProgress = Object.entries(groupedLevelKuisProgressJSON).map(([level, kuisProgress]) => {

          const sumberSkillData = levelGroup.find((s) => s.namaSkill === namaSkill && s.level === Number(level));
          const jumlahKuisProgressLulus = kuisProgress.length
          const isLulus = jumlahKuisProgressLulus === sumberSkillData?.jumlahSubskillPerLevel;

          return {
            level: Number(level),
            isLulus
          }
        })

        // scan Array Every
        // const highestLevelAndLulus = groupedLevelKuisProgress
        //   .filter(item => item.isLulus)
        //   .reduce<(typeof groupedLevelKuisProgress)[number] | undefined>(
        //     (max, item) => !max || item.level > max.level ? item : max,
        //     undefined
        //   )?.level ?? 0;
        // find the highest level that is lulus - break if there is a gap (e.g. lulus level 1 and 3, but not 2)
        const lulusLevels = groupedLevelKuisProgress
          .filter(item => item.isLulus)
          .map(item => item.level)
          .sort((a, b) => a - b);

        let highest = 0;
        for (let i = 0; i < lulusLevels.length; i++) {
          if (lulusLevels[i] === i + 1) {
            highest = lulusLevels[i];
          } else {
            break; // Ada yang bolong, stop
          }
        }


        return {
          namaSkill,
          groupedLevelKuisProgress,
          highest
        }
      })

      return {
        namaUser: user.namaUser,
        idUser: user.idUser,
        skills: groupedSkill
      }
    })

    const sortedData = sortedListIndividuSkillV2(res)

    // if filter on
    if (filter?.skill) {
      return sortedData.filter((user) => user.skills.some((skill) => skill.namaSkill === filter.skill));
    }

    return sortedData

  }

  static async getListIndividuSkillSingle(idUser: string) {

    const user = await db.query.mUserProfiles.findFirst({
      columns: {
        idUser: true,
        namaUser: true
      },
      with: {
        kuisProgress: {
          where: {
            RAW: (table) => sql`(${table.totalScore} * 100 / ${table.jumlahSoal}) >= 80`,
          },
          columns: {
            idUser: true,
            idKuisProgress: true,
            jumlahSoal: true,
            totalScore: true,
            idKuis: true
          },
          with: {
            skill: {
              columns: {
                idSkill: true,
                namaSkill: true,
              }
            },
            subskill: {
              columns: {
                idSubSkill: true,
                level: true,
              }
            }
          }
        },
      },
      where: {
        idUser: idUser,
        // team: true
        // idUser: "c5c966fa-5081-462f-b0d5-493addfe7131"
        // idUser: "4d242348-3f78-47a0-9282-b0ecd9ccbb66"
      }
    })

    if (!user) {
      throw new Error("User not found")
    }


    const levelGroup = await db.select({
      idSkill: mSkill.idSkill,
      namaSkill: mSkill.namaSkill,
      level: mSubSkill.level,
      jumlahSubskillPerLevel: sql<number>`count(*)`
        .mapWith(Number)
        .as("jumlahSubskillPerLevel")
    }).from(mSkill)
      .leftJoin(mSubSkill, eq(mSkill.idSkill, mSubSkill.idSkill))
      .groupBy(mSkill.idSkill, mSkill.namaSkill, mSubSkill.level)
      .orderBy(mSkill.namaSkill, mSubSkill.level)


    const groupedSkillJSON = R.groupBy(user.kuisProgress, (item) => item.skill?.namaSkill)
    const groupedSkill = Object.entries(groupedSkillJSON).map(([namaSkill, kuisProgress]) => {

      const groupedLevelKuisProgressJSON = R.groupBy(kuisProgress, (item) => item.subskill?.level)
      const groupedLevelKuisProgress = Object.entries(groupedLevelKuisProgressJSON).map(([level, kuisProgress]) => {

        const sumberSkillData = levelGroup.find((s) => s.namaSkill === namaSkill && s.level === Number(level));
        const jumlahKuisProgressLulus = kuisProgress.length
        const isLulus = jumlahKuisProgressLulus === sumberSkillData?.jumlahSubskillPerLevel;

        return {
          level: Number(level),
          isLulus
        }
      })

      // scan Array Every
      // const highestLevelAndLulus = groupedLevelKuisProgress
      //   .filter(item => item.isLulus)
      //   .reduce<(typeof groupedLevelKuisProgress)[number] | undefined>(
      //     (max, item) => !max || item.level > max.level ? item : max,
      //     undefined
      //   )?.level ?? 0;
      // find the highest level that is lulus - break if there is a gap (e.g. lulus level 1 and 3, but not 2)
      const lulusLevels = groupedLevelKuisProgress
        .filter(item => item.isLulus)
        .map(item => item.level)
        .sort((a, b) => a - b);

      let highest = 0;
      for (let i = 0; i < lulusLevels.length; i++) {
        if (lulusLevels[i] === i + 1) {
          highest = lulusLevels[i];
        } else {
          break; // Ada yang bolong, stop
        }
      }


      return {
        namaSkill,
        groupedLevelKuisProgress,
        highest
      }
    })

    return {
      namaUser: user.namaUser,
      idUser: user.idUser,
      skills: groupedSkill
    }
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
