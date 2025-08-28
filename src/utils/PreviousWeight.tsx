export const textPreviousWeight = (data: string): string => {
    if (data == "one-month") return "il y a 1 mois ou plus";
    else if (data == "six-month") return "il y a 6 mois ou plus";
    else if (data == "before-disease") return "avant le début de la maladie";
    else return "";
}