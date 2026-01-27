import { getSkillStats } from "@/features/dashboard/public/services/getSkillStats";
import { getSkillByIdPicSubSkill } from "@/features/subskill/services/getSkillByIdPicSubSkill";


async function main() {
    const result = await getSkillByIdPicSubSkill("8a623469-4b42-4bf2-8bd9-7dc38ce10f5d");

    console.dir(result, { depth: null }); // biar nested kebuka semua
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
