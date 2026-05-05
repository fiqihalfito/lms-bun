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
}
