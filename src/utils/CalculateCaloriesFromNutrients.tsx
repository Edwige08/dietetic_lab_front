export const CalculateCalories = (proteins: number, fats: number, carbohydrates: number, alcohol: number) => {
    const result = (proteins * 4) + (fats * 9) + (carbohydrates * 4) + (alcohol * 7);
    return parseFloat(result.toFixed(0));
}