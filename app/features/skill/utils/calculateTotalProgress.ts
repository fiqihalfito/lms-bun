import type { GroupLevelType } from "../services/getSkillAndStats";

// 2. Menghitung total persentase skill
export const calculateTotalProgress = (groupLevel: GroupLevelType) => {
    let totalRead = 0;
    let totalLulusKuis = 0;
    let totalSubskill = 0;

    if (!groupLevel) return 0;

    Object.values(groupLevel).forEach((level) => {
        totalRead += level.sudahBaca || 0;
        totalLulusKuis += level.lulusKuis || 0;
        totalSubskill += level.jumlahSubskill || 0;
    });

    const totalProgress = totalRead + totalLulusKuis;
    const AvgProgress = totalProgress / 2;
    const totalProgressPercentage = AvgProgress / totalSubskill * 100;

    return totalSubskill === 0 ? 0 : Math.round(totalProgressPercentage);
};
