import { expect, test } from 'vitest';
import { textPreviousWeight } from './PreviousWeight';

test('if "one-month" return "il y a 1 mois ou plus"', () => {
    expect(textPreviousWeight("one-month")).toBe("il y a 1 mois ou plus")
})

test('if "six-month" return "il y a 6 mois ou plus"', () => {
    expect(textPreviousWeight("six-month")).toBe("il y a 6 mois ou plus")
})

test('if "before-disease" return "avant le début de la maladie"', () => {
    expect(textPreviousWeight("before-disease")).toBe("avant le début de la maladie")
})

test('if "" return ""', () => {
    expect(textPreviousWeight("")).toBe("")
})