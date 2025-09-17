import { expect, test } from 'vitest';
import { CalculateCalories } from './CalculateCaloriesFromNutrients';

test('', () => {
    expect(CalculateCalories(20, 5, 0, 0)).toBe(125);
})

test('', () => {
    expect(CalculateCalories(8, 2, 15, 2)).toBe(124);
})

test('', () => {
    expect(CalculateCalories(0, 0, 0, 0)).toBe(0);
})