import { expect, test } from 'vitest';
import { CalculateIMC } from './CalculateIMC';

test('weight 70kg, height 170cm, imc 24.22', () => {
    expect(CalculateIMC(70, 170)).toBe(24.22)
})

test('weight 120kg, height 190cm, imc 33.24', () => {
    expect(CalculateIMC(120, 190)).toBe(33.24)
})

test('weight 70kg, height 170cm, imc 17.72', () => {
    expect(CalculateIMC(50, 168)).toBe(17.72)
})