export const CalculateIMC = (weight: number, height: number): number => {
    const imc = weight / ((height / 100) ** 2);
    return imc;
}