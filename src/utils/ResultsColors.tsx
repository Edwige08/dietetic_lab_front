export const IMCCategoryColor = (imc: number): string => {
    if (imc < 18.5) return "bg-(--yellowLightColor)"
    else if (imc < 25) return "bg-(--greenLightColor)"
    else if (imc < 30) return "bg-(--orangeLightColor)"
    else if (imc < 35) return "bg-(--redLightColor)"
    else if (imc < 40) return "bg-(--redLightColor)"
    else if (imc < 45) return "bg-(--redLightColor)"
    else return "bg-(--redLightColor)"
}