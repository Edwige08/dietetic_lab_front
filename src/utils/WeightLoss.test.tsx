import { expect, test } from 'vitest';
import { WeightLoss } from './WeightLoss';

test('if weight is 70 and previousWeight is 80 should return 12.5', () => {
    expect(WeightLoss(70, 80)).toBe(12.5);
});
test('if weight is 0 should return 0', () => {
    expect(WeightLoss(0, 80)).toBe(0);
});
test('if previousWeight is 0 should return 0', () => {
    expect(WeightLoss(70, 0)).toBe(0);
}); 