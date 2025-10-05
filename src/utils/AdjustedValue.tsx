export const adjustedValue = (valueFor100g: string, quantity: number): number => {
    const normalizedValue = valueFor100g.replace(',', '.');
    return (parseFloat(normalizedValue) * quantity / 100) || 0
}