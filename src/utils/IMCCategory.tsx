export const IMCCategory = (imc: number): string => {
    if (imc < 18.5) return "un état de maigreur"
    else if (imc < 25) return "un équilibre staturo-pondéral"
    else if (imc < 30) return "un surpoids"
    else if (imc < 35) return "une obésité de grade I"
    else if (imc < 40) return "une obésité de grade II"
    else if (imc < 45) return "une obésité de grade III"
    else return "une obésité de grade IV"
}