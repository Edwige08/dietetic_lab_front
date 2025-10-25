export const IMCCategoryColor = (imc: number): string => {
    if (imc < 18.5) return "bg-(--yellowLightColor)"
    else if (imc < 25) return "bg-(--greenLightColor)"
    else if (imc < 30) return "bg-(--orangeLightColor)"
    else if (imc < 35) return "bg-(--redLightColor)"
    else if (imc < 40) return "bg-(--redLightColor)"
    else if (imc < 45) return "bg-(--redLightColor)"
    else return "bg-(--redLightColor)"
}

export const UndernutritionCategoryColor = (result: "no" | "moderate" | "severe"): string => {
    if (result === "no") return "bg-(--greenLightColor)"
    else if (result === "moderate") return "bg-(--orangeLightColor)"
    else return "bg-(--redLightColor)"
}

export const SRICategoryColor = (majorCriterion: number, minorCriterion: number): string => {
    if (majorCriterion > 0) return "bg-(--redLightColor)"
    else if ((minorCriterion > 1)) return "bg-(--redLightColor)"
    else if (minorCriterion  === 1) return "bg-(--orangeLightColor)"
    else return "bg-(--greenLightColor)"
}