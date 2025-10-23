import { expect, test } from 'vitest';
import { adjustedValue } from './AdjustedValue';

test('adjustedValue("0", 100) is 0', () => {
    expect(adjustedValue("0", 100,)).toBe(0);
})
test('adjustedValue("10", 100) is 10', () => {
    expect(adjustedValue("10", 100,)).toBe(10);
})
test('adjustedValue("10", 200) is 20', () => {
    expect(adjustedValue("10", 200,)).toBe(20);
})
test('adjustedValue("10,1", 200) is 20.2', () => {
    expect(adjustedValue("10,1", 200,)).toBe(20.2);
})
test('adjustedValue("10.1", 200) is 20.2', () => {
    expect(adjustedValue("10.1", 200,)).toBe(20.2);
})
test('adjustedValue("-", 200) is 0', () => {
    expect(adjustedValue("-", 200,)).toBe(0);
})
test('adjustedValue(0, "100") is 0', () => {
    expect(adjustedValue(0, 100)).toBe(0);
})
test('adjustedValue(0, 100) is 0', () => {
    expect(adjustedValue(0, 100)).toBe(0);
})
test('adjustedValue(10, 100) is 10', () => {
    expect(adjustedValue(10, 100)).toBe(10);
})
test('adjustedValue(10, 200) is 20', () => {
    expect(adjustedValue(10, 200)).toBe(20);
})
test('adjustedValue(10.1, 200) is 20.2', () => {
    expect(adjustedValue(10.1, 200)).toBe(20.2);
})