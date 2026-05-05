import type { tDokumen } from "database/schema";
import { DokumenMutation } from "../repo/DokumenMutation";
import { DokumenQuery } from "../repo/DokumenQuery";

export abstract class DokumenService {
  static async getDokumenById(idDokumen: string) {
    return await DokumenQuery.findById(idDokumen);
  }

  static async getDokumenByTipe(tipe: string, idUser: string) {
    return await DokumenQuery.findByTipe(tipe, idUser);
  }

  static async getDokumenFilenameById(idDokumen: string) {
    return await DokumenQuery.findFilenameById(idDokumen);
  }

  static async markAsRead(idDokumen: string, idPembaca: string) {
    await DokumenMutation.insertStatusBacaOnConflictDoUpdate(
      idDokumen,
      idPembaca,
    );
  }

  static async saveDokumen(
    dokumen: typeof tDokumen.$inferInsert,
    withReturning: boolean,
  ) {
    return await DokumenMutation.insertDokumen(dokumen, withReturning);
  }

  static async editDokumen(
    idDokumen: string,
    dokumen: typeof tDokumen.$inferInsert,
  ) {
    return await DokumenMutation.updateDokumen(idDokumen, dokumen);
  }
}
