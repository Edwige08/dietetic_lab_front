export const CalculateDEJHandBWoman = (weight: number, height: number, age: number, nap: number) => {
    const result = parseFloat(((9.740 * weight + 184.96 * (height / 100) - 4.6756 * age + 655.0955) * nap).toFixed(0));
    return result;
}

export const CalculateDEJHandBMan = (weight: number, height: number, age: number, nap: number) => {
    const result = parseFloat(((13.7516 * weight + 500.33 * (height / 100) - 6.7550 * age + 66.479) * nap).toFixed(0));
    return result;
}

export const CalculateDEJBlackWoman = (weight: number, height: number, age: number, nap: number) => {
    const result = parseFloat(((0.963 * Math.pow(weight, 0.48) * Math.pow((height / 100), 0.50) * Math.pow(age, -0.13)) * nap * 239).toFixed(0));
    return result;
}

export const CalculateDEJBlackMan = (weight: number, height: number, age: number, nap: number) => {
    const result = parseFloat(((1.083 * Math.pow(weight, 0.48) * Math.pow((height / 100), 0.50) * Math.pow(age, -0.13)) * nap * 239).toFixed(0));
    return result;
}