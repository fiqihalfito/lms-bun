import { DashboardQuery } from "../repo/DashboardQuery";
import * as R from "remeda";

export abstract class DashboardService {
    static async getJumlahLulusPerSkill(idSubBidang?: string) {
        const data = await DashboardQuery.getJumlahLulusPerSkill(idSubBidang)

        const mappingRes = R.pipe(
            data,
            R.groupBy(x => x.namaTeam ?? "other_team"),
            R.entries(),
            R.map(([namaTeam, items]) => ({
                namaTeam,
                jumlahOrangPerTeam: items[0].jumlahOrangPerTeam,
                skill: items.map(item => ({
                    namaSkill: item.namaSkill,
                    jumlahLulus: item.jumlahLulus,
                })),
            }))
        );

        return mappingRes
    }

    static async getListIndividuSkill(idSubBidang?: string) {
        const data = await DashboardQuery.getListIndividuSkill(idSubBidang)

        const mappingRes = R.pipe(
            data,
            R.groupBy(x => x.namaTeam ?? "other_team"),
            R.entries(),
            R.map(([namaTeam, membersData]) => ({
                namaTeam,
                users: R.pipe(
                    membersData,
                    R.groupBy(member => member.namaUser),
                    R.entries(),
                    R.map(([namaUser, listCurrSkills]) => ({
                        namaUser,
                        idUser: listCurrSkills[0].idUser,
                        skills: listCurrSkills.map(skill => ({
                            namaSkill: skill.namaSkill,
                            level: skill.level,
                        })),
                    }))
                )
            }))
        );

        return mappingRes
    }
}