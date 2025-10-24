import { expect, test } from 'vitest';
import { IMCCategoryColor } from './ResultsColors';

test('imc < 18,5 = "bg-(--yellowLightColor)"', () => {
    expect(IMCCategoryColor(1)).toBe('bg-(--yellowLightColor)')
})
test('imc < 18,5 = "bg-(--yellowLightColor)"', () => {
    expect(IMCCategoryColor(18.49)).toBe('bg-(--yellowLightColor)')
})
test('18,5 <= imc < 25 = "bg-(--greenLightColor)"', () => {
    expect(IMCCategoryColor(18.5)).toBe('bg-(--greenLightColor)')
})
test('18,5 <= imc < 25 = "bg-(--greenLightColor)"', () => {
    expect(IMCCategoryColor(24.99)).toBe('bg-(--greenLightColor)')
})
test('25 <= imc < 30 = "bg-(--orangeLightColor)"', () => {
    expect(IMCCategoryColor(25)).toBe('bg-(--orangeLightColor)')
})
test('25 <= imc < 30 = "bg-(--orangeLightColor)"', () => {
    expect(IMCCategoryColor(29.99)).toBe('bg-(--orangeLightColor)')
})
test('30 <= imc < 35 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(30)).toBe('bg-(--redLightColor)')
})
test('30 <= imc < 35 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(34.99)).toBe('bg-(--redLightColor)')
})
test('35 <= imc < 40 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(35)).toBe('bg-(--redLightColor)')
})
test('35 <= imc < 40 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(39.99)).toBe('bg-(--redLightColor)')
})
test('40 <= imc < 45 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(40)).toBe('bg-(--redLightColor)')
})
test('40 <= imc < 45 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(44.99)).toBe('bg-(--redLightColor)')
})
test('imc >= 45 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(45)).toBe('bg-(--redLightColor)')
})
test('imc >= 45 = "bg-(--redLightColor)"', () => {
    expect(IMCCategoryColor(50)).toBe('bg-(--redLightColor)')
})
