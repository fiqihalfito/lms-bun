import { db } from "database/connect.server";


export async function getDokumenFilenameById(idDokumen: string) {
    const res = await db.query.tDokumen.findFirst({
        columns: {
            filename: true
        },
        where: {
            idDokumen
        }
    })
    return res?.filename
}