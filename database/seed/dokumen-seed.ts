import type { tDokumen } from "database/schema";
import { mapUserSeed } from "./user-seed";
import { mapLayananS1 } from "./layanan-seed";
import { teamSeed } from "./team-seed";


export const dokumenSeed: typeof tDokumen.$inferInsert[] = [
    // SOP
    {
        judul: "SOP Korporat 1",
        filename: "test-pdf.pdf",
        tipe: "sop",
        idSubBidang: "s1",
        idLayanan: null,
        idTeam: null,
        idUploader: mapUserSeed["fiqih.alfito@iconpln.co.id"],
    },
    // IK
    {
        judul: "IK Database AMS",
        filename: "test-pdf.pdf",
        tipe: "ik",
        idSubBidang: "s1",
        idLayanan: mapLayananS1["AMS"],
        idTeam: teamSeed[0].idTeam,
        idUploader: mapUserSeed["asdin.pamungkas@iconpln.co.id"],
    },

]