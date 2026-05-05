import { db } from "database/connect.server";
import { tDokumen } from "database/schema";
import { eq } from "drizzle-orm";

export abstract class DokumenQuery {
  static async findById(idDokumen: string) {
    const res = await db
      .select()
      .from(tDokumen)
      .where(eq(tDokumen.idDokumen, idDokumen));
    return res;
  }

  static async findByTipe(tipe: string, idUser: string) {
    const res = await db.query.tDokumen.findMany({
      where: {
        tipe: tipe,
      },
      orderBy: {
        judul: "asc",
      },
      with: {
        uploader: true,
        layanan: true,
        team: true,
        pembaca: {
          where: {
            idPembaca: idUser,
          },
        },
      },
    });
    return res;
  }

  static async findFilenameById(idDokumen: string) {
    const res = await db.query.tDokumen.findFirst({
      columns: {
        filename: true,
      },
      where: {
        idDokumen,
      },
    });
    return res?.filename;
  }
}
