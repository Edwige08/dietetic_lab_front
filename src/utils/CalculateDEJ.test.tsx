import { expect, test } from 'vitest';
import { CalculateDEJBlackMan, CalculateDEJBlackWoman, CalculateDEJHandBMan, CalculateDEJHandBWoman } from './CalculateDEJ';

test('CalculateDEJHandBWoman(80, 170, 42, 1.6) is 2484', () => {
    expect(CalculateDEJHandBWoman(80, 170, 42, 1.6)).toBe(2484);
})

test('CalculateDEJHandBMan(80, 170, 42, 1.6) is 2774', () => {
    expect(CalculateDEJHandBMan(80, 170, 42, 1.6)).toBe(2774);
})

test('CalculateDEJBlackWoman(80, 170, 42, 1.6) is 2420', () => {
    expect(CalculateDEJBlackWoman(80, 170, 42, 1.6)).toBe(2420);
})

test('CalculateDEJBlackMan(80, 170, 42, 1.6) is 2722', () => {
    expect(CalculateDEJBlackMan(80, 170, 42, 1.6)).toBe(2722);
})