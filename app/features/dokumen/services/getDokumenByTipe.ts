import { db } from "database/connect.server";


export async function getDokumenByTipe(tipe: string, idUser: string) {
    const res = await db.query.tDokumen.findMany({
        where: {
            tipe: tipe
        },
        orderBy: {
            judul: "asc"
        },
        with: {
            uploader: true,
            layanan: true,
            team: true,
            pembaca: {
                where: {
                    idPembaca: idUser
                }
            }
        }
    })
    return res
}