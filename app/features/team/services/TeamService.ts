import invariant from "tiny-invariant";
import { TeamQuery } from "../repo/TeamQuery";
import { TeamMutation } from "../repo/TeamMutation";

export abstract class TeamService {
  static async getTeamById(idTeam: string) {
    const team = await TeamQuery.findByid(idTeam);
    // invariant(team.length > 0, "Team tidak ditemukan");
    return team;
  }

  static async getTeamsAll(idSubBidang: string) {
    const teams = await TeamQuery.findAllTeamByIdSubBidang(idSubBidang);
    return teams;
  }

  static async getIdTeamByIdUser(idUser: string) {
    const idTeam = await TeamQuery.findIdTeamByIdUser(idUser);
    return idTeam;
  }

  static async getTeamsByIdUser(idUser: string) {
    const teams = await TeamQuery.findTeamsByIdUser(idUser);
    if (!teams || teams.length === 0) {
      return [];
    }
    return teams;
  }

  static async saveTeam(idSubBidang: string, namaTeam: string) {
    await TeamMutation.insertTeam(idSubBidang, namaTeam);
  }

  static async editTeam(idTeam: string, namaTeam: string) {
    await TeamMutation.updateTeam(idTeam, namaTeam);
  }
}
