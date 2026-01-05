export function getOptionDesc(target: string, options: {
    idKuisQuestionOption: string;
    idKuisQuestion: string | null;
    option: string;
    optionDesc: string;
}[]) {
    return options.find((option) => option.option === target)?.optionDesc
}