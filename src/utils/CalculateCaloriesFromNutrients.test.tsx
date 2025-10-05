import { expect, test } from 'vitest';
import { CalculateCalories } from './CalculateCaloriesFromNutrients';

test('CalculateCalories(20, 5, 0, 0) is 125', () => {
    expect(CalculateCalories(20, 5, 0, 0)).toBe(125);
})

test('CalculateCalories(8, 2, 15, 2) is 124', () => {
    expect(CalculateCalories(8, 2, 15, 2)).toBe(124);
})

test('If all the numbers are 0 it returns 0', () => {
    expect(CalculateCalories(0, 0, 0, 0)).toBe(0);
})