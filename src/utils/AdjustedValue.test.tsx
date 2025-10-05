import { expect, test } from 'vitest';
import { adjustedValue } from './AdjustedValue';


test('', () => {
    expect(adjustedValue("0", 100,)).toBe(0);
})
test('', () => {
    expect(adjustedValue("10", 100,)).toBe(10);
})

test('', () => {
    expect(adjustedValue("10", 200,)).toBe(20);
})

test('', () => {
    expect(adjustedValue("10,1", 200,)).toBe(20.2);
})

test('', () => {
    expect(adjustedValue("10.1", 200,)).toBe(20.2);
})

test('', () => {
    expect(adjustedValue("-", 200,)).toBe(0);
})