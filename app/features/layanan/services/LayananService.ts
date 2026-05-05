import invariant from "tiny-invariant";
import { LayananQuery } from "../repo/LayananQuery";
import { LayananMutation } from "../repo/LayananMutation";

export abstract class LayananService {
  static async getAllLayanan(idSubBidang: string) {
    const data = await LayananQuery.findAllLayanan(idSubBidang);
    return data;
  }

  static async getLayananById(idLayanan: string) {
    const data = await LayananQuery.findById(idLayanan);
    invariant(data.length > 0, "Layanan tidak ditemukan");
    return data[0];
  }

  static async saveLayanan(idSubBidang: string, namaLayanan: string) {
    await LayananMutation.insertLayanan(idSubBidang, namaLayanan);
  }

  static async editLayanan(idLayanan: string, namaLayanan: string) {
    await LayananMutation.updateLayanan(idLayanan, namaLayanan);
  }
}
