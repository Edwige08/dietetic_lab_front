import { expect, test } from 'vitest';
import { CalculateJoules } from './CalculateJoulesFromNutrients';

test('', () => {
    expect(CalculateJoules(20, 5, 0, 0)).toBe(530);
})

test('', () => {
    expect(CalculateJoules(8, 2, 15, 2)).toBe(525);
})

test('', () => {
    expect(CalculateJoules(0, 0, 0, 0)).toBe(0);
})