import { sql } from "drizzle-orm";
import { db } from "../connect";
import { mLayanan, mSkill, mSubBidang, mSubSkill, mTeam, mTeamMember, mUserProfiles, mUsers, tDokumen, tStatusBaca } from "../schema";
import { subbidangSeed } from "./subbidang-seed";
import { mRole } from "database/schema/role";
import { roleSeed } from "./role-seed";
import { teamSeed } from "./team-seed";
import { mapUserSeed, usersSeed } from "./user-seed";
import { layananS1 } from "./layanan-seed";
import { getDbErrorMessage } from "database/utils/dbErrorUtils";
import { mapSkill, skillSeed } from "./skill-seed";
import { seedDBASubskill, seedSubskillAdministrasiOS } from "./subskill-dba-seed";
import { seedBackupAplikasi, seedContainerizationDocker, seedContainerizationKubernetes, seedGitGitlab, seedLinuxServer, seedLogAnalisis, seedLogManagement, seedMonitoring, seedRestoreAplikasi, seedSecurityOS, seedVirtualMachine, seedWebServer, seedWindowsServer } from "./subskill-devops-seed";
import { relations } from "database/relations";
import { dokumenSeed } from "./dokumen-seed";


async function main() {
    try {
        console.time("🌱 Seeding completed in");

        // 0️⃣ Bersihkan semua tabel (urutan penting karena foreign key)
        console.log("🧹 Truncating all tables...");
        await db.execute(sql`
            TRUNCATE TABLE 
                ${tStatusBaca}, 
                ${mTeamMember},
                ${tDokumen}, 
                ${mSubSkill}, 
                ${mSkill}, 
                ${mUsers}, 
                ${mUserProfiles},
                ${mTeam}, 
                ${mLayanan}, 
                ${mRole},
                ${mSubBidang}
            RESTART IDENTITY CASCADE;
        `);

        // seed subbidang
        console.log("📂 Seeding subbidang...");
        await db.insert(mSubBidang).values(subbidangSeed);
        console.log("📂 Seeding subbidang completed!");

        // seed role
        console.log("🔑 Seeding role...");
        await db.insert(mRole).values(roleSeed);
        console.log("🔑 Seeding role completed!");

        // seed team
        console.log("👥 Seeding team...");
        await db.insert(mTeam).values(teamSeed);
        console.log("👥 Seeding team completed!");

        // seed user
        console.log("👤 Seeding user...");
        await db.insert(mUsers).values(usersSeed);
        console.log("👤 Seeding user completed!");

        // seed user profile
        console.log("🆔 Seeding user profile...");
        await db.insert(mUserProfiles).values(usersSeed);
        console.log("🆔 Seeding user profile completed!");

        // seed layanan
        console.log("🛠️ Seeding layanan...");
        await db.insert(mLayanan).values(layananS1);
        console.log("🛠️ Seeding layanan completed!");

        // seed team member
        console.log("👥 Seeding team member...");
        await db.insert(mTeamMember).values(usersSeed);
        console.log("👥 Seeding team member completed!");

        // seed skill
        console.log("🛠️ Seeding skill...");
        await db.insert(mSkill).values(skillSeed);
        console.log("🛠️ Seeding skill completed!");

        // seed subskill
        console.log("🛠️ Seeding subskill...");
        const subskillAllSeed: typeof mSubSkill.$inferInsert[] = [
            ...seedDBASubskill(mapSkill["PostgreSQL"], mapUserSeed["ando.wibawa@iconpln.co.id"]),
            ...seedDBASubskill(mapSkill["MySQL"], mapUserSeed["fahri.firmansyah@iconpln.co.id"]),
            ...seedDBASubskill(mapSkill["SQL Server"], mapUserSeed["rizky.ramdani@iconpln.co.id"]),
            ...seedDBASubskill(mapSkill["MongoDB"], mapUserSeed["asdin.pamungkas@iconpln.co.id"]),
            ...seedSubskillAdministrasiOS(mapSkill["Administrasi Linux"], mapUserSeed["ikrar.harvy@iconpln.co.id"]),
            ...seedSubskillAdministrasiOS(mapSkill["Administrasi Windows"], mapUserSeed["hananta.prasetia@iconpln.co.id"]),
            ...seedVirtualMachine(mapSkill["Virtual Machine"], mapUserSeed["andika.putra@iconpln.co.id"]),
            ...seedLinuxServer(mapSkill["Linux Server"], mapUserSeed["andika.putra@iconpln.co.id"]),
            ...seedWindowsServer(mapSkill["Windows Server"], mapUserSeed["andika.putra@iconpln.co.id"]),
            ...seedWebServer(mapSkill["Web Server"], mapUserSeed["andika.putra@iconpln.co.id"]),
            ...seedMonitoring(mapSkill["Monitoring Server & APM"], mapUserSeed["agung.febriyanto@iconpln.co.id"]),
            ...seedBackupAplikasi(mapSkill["Backup Aplikasi"], mapUserSeed["agung.surya@iconpln.co.id"]),
            ...seedRestoreAplikasi(mapSkill["Restore Aplikasi"], mapUserSeed["agung.surya@iconpln.co.id"]),
            ...seedSecurityOS(mapSkill["Security OS"], mapUserSeed["andika.putra@iconpln.co.id"]),
            ...seedContainerizationDocker(mapSkill["Containerization Docker"], mapUserSeed["andika.putra@iconpln.co.id"]),
            ...seedContainerizationKubernetes(mapSkill["Containerization Kubernetes"], mapUserSeed["andika.putra@iconpln.co.id"]),
            ...seedGitGitlab(mapSkill["Git & Gitlab"], mapUserSeed["muamar.muamar@iconpln.co.id"]),
            ...seedLogManagement(mapSkill["Log Management"], mapUserSeed["tedi.mahendra@iconpln.co.id"]),
            ...seedLogAnalisis(mapSkill["Log Analisis"], mapUserSeed["tedi.mahendra@iconpln.co.id"]),
        ]
        await db.insert(mSubSkill).values(subskillAllSeed);
        console.log("🛠️ Seeding subskill completed!");

        // seed dokumen
        console.log("📄 Seeding dokumen...");
        await db.insert(tDokumen).values(dokumenSeed);
        console.log("📄 Seeding dokumen completed!");

        console.timeEnd("🌱 Seeding completed in");
    } catch (error) {
        const { message, constraint } = getDbErrorMessage(error);
        console.log(message, constraint);
        console.log(error)

    }
}

main()