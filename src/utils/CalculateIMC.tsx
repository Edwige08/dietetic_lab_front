export const CalculateIMC = (weight: number, height: number): number => {
    const imc = parseFloat((weight / ((height / 100) ** 2)).toFixed(2));
    return imc;
}