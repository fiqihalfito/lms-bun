import { getSkillStats } from "@/features/dashboard/public/services/getSkillStats";


async function main() {
    const result = await getSkillStats();

    console.dir(result, { depth: null }); // biar nested kebuka semua
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
