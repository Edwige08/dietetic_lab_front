export const adjustedValue = (valueFor100g: string | number, quantity: number): number => {
    if (typeof valueFor100g === 'number') {
        return (valueFor100g * quantity / 100) || 0;
    }
    const normalizedValue = valueFor100g.replace(',', '.');
    return (parseFloat(normalizedValue) * quantity / 100) || 0;
}