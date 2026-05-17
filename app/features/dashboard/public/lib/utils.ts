
export type getListIndividuSkill_V2Prop = {
    namaUser: string;
    idUser: string;
    skills: {
        namaSkill: string;
        groupedLevelKuisProgress: {
            level: number;
            isLulus: boolean;
        }[];
        highest: number;
    }[];
}

export const sortedListIndividuSkillV2 = (res: getListIndividuSkill_V2Prop[]) => res.sort((a, b) => {
    const aHasSkills = a.skills.length > 0;
    const bHasSkills = b.skills.length > 0;

    // 1. User dengan skills naik duluan
    if (aHasSkills && !bHasSkills) return -1;
    if (!aHasSkills && bHasSkills) return 1;

    // 2. Keduanya punya skills → yang lebih banyak duluan
    if (aHasSkills && bHasSkills) {
        if (b.skills.length !== a.skills.length) {
            return b.skills.length - a.skills.length;
        }

        // 3. Jumlah skills sama → A-Z by namaUser
        return a.namaUser.localeCompare(b.namaUser, "id");
    }

    // 4. Keduanya kosong → pertahankan urutan
    return 0;
});