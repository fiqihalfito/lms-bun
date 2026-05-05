import { SubbidangQuery } from "../repo/SubbidangQuery";

export abstract class SubbidangService {
  static async getAllSubbidang() {
    const res = await SubbidangQuery.getAllSubbidang();
    return res;
  }
}
