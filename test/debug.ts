
import { getSkillProgressDetailByIdSkill } from "@/features/subskill/services/getSkillProgressDetailByIdSkill";


async function main() {
    const result = await getSkillProgressDetailByIdSkill("a9bce9a3-5d3f-4db7-9e41-9f8a6cfb92c1", "8a623469-4b42-4bf2-8bd9-7dc38ce10f5d");

    console.dir(result, { depth: null }); // biar nested kebuka semua
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
