import { expect, test } from 'vitest';
import { CalculateJoules } from './CalculateJoulesFromNutrients';

test('CalculateJoules(20, 5, 0, 0) is 530', () => {
    expect(CalculateJoules(20, 5, 0, 0)).toBe(530);
})

test('CalculateJoules(8, 2, 15, 2) is 525', () => {
    expect(CalculateJoules(8, 2, 15, 2)).toBe(525);
})

test('If all the numbers are 0 it returns 0', () => {
    expect(CalculateJoules(0, 0, 0, 0)).toBe(0);
})