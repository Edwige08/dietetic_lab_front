export function WeightLoss(weight: number, previousWeight: number): number {
    if (weight > 0 && previousWeight > 0) {
        const result = (((previousWeight - weight) / previousWeight) * 100).toFixed((1));
        return parseFloat(result);
    }
    return 0;
}