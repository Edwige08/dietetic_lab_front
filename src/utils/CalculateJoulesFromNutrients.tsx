export const CalculateJoules = (proteins: number, fats: number, carbohydrates: number, alcohol: number) => {
    const result = (proteins * 17) + (fats * 38) + (carbohydrates * 17) + (alcohol * 29);
    return parseFloat(result.toFixed(0));
}