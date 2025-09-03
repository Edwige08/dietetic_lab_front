import { expect, test } from 'vitest';
import { CalculateDEJBlackMan, CalculateDEJBlackWoman, CalculateDEJHandBMan, CalculateDEJHandBWoman } from './CalculateDEJ';

test('', () => {
    expect(CalculateDEJHandBWoman(80, 170, 42, 1.6)).toBe(2484);
})

test('', () => {
    expect(CalculateDEJHandBMan(80, 170, 42, 1.6)).toBe(2774);
})

test('', () => {
    expect(CalculateDEJBlackWoman(80, 170, 42, 1.6)).toBe(2420);
})

test('', () => {
    expect(CalculateDEJBlackMan(80, 170, 42, 1.6)).toBe(2722);
})