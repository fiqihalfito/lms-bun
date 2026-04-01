import { db } from "database/connect.server";

export async function getUserProfileAll(idSubBidang: string, { team }: { team: string[] } = { team: [] }) {

    // conditional first
    const filterTeam = team.length > 0 ? team : undefined

    const res = await db.query.mUserProfiles.findMany({
        with: {
            userAccount: {
                columns: {
                    password: false
                }
            },
            team: true
        },
        where: {
            idSubBidang: idSubBidang,
            team: {
                idTeam: {
                    in: filterTeam
                }
            }
        },
        orderBy: {
            namaUser: "asc"
        }
    })

    return res
}