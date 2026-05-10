import { RoleQuery } from "../repo/RoleQuery";

export abstract class RoleService {
  static async getAllRole() {
    const data = await RoleQuery.findAllRole();
    return data;
  }

  static async getRoleNameByIdRole(idRole: string | null) {
    const data = await RoleQuery.findRoleNameByIdRole(idRole);
    return data;
  }

  static async getLoginPathByIdUser(idUser: string) {
    let idRole = await RoleQuery.findRoleByIdUser(idUser);
    idRole = idRole || "tad";

    const mapLoginPath = {
      "pegawai": "/app/master",
      "tad": "/app/dashboard"
    }
    return mapLoginPath[idRole as keyof typeof mapLoginPath];
  }
}
