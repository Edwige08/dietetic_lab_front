import { expect, test } from 'vitest';
import { IMCCategory, IMCCategorySimple } from './IMCCategory';

// TEST IMCCategorySimple --------------------------------------------
test('imc < 18,5 = "maigreur"', () => {
    expect(IMCCategorySimple(1)).toBe('maigreur')
})

test('imc < 18,5 = "maigreur"', () => {
    expect(IMCCategorySimple(18.49)).toBe('maigreur')
})

test('18,5 <= imc < 25 = "équilibre staturo-pondéral"', () => {
    expect(IMCCategorySimple(18.5)).toBe('équilibre staturo-pondéral')
})

test('18,5 <= imc < 25 = "équilibre staturo-pondéral"', () => {
    expect(IMCCategorySimple(24.99)).toBe('équilibre staturo-pondéral')
})

test('25 <= imc < 30 = "surpoids"', () => {
    expect(IMCCategorySimple(25)).toBe('surpoids')
})

test('25 <= imc < 30 = "surpoids"', () => {
    expect(IMCCategorySimple(29.99)).toBe('surpoids')
})

test('30 <= imc < 35 = "obésité de grade I"', () => {
    expect(IMCCategorySimple(30)).toBe('obésité de grade I')
})

test('30 <= imc < 35 = "obésité de grade I"', () => {
    expect(IMCCategorySimple(34.99)).toBe('obésité de grade I')
})

test('35 <= imc < 40 = "obésité de grade II"', () => {
    expect(IMCCategorySimple(35)).toBe('obésité de grade II')
})

test('35 <= imc < 40 = "obésité de grade II"', () => {
    expect(IMCCategorySimple(39.99)).toBe('obésité de grade II')
})

test('40 <= imc < 45 = "obésité de grade III"', () => {
    expect(IMCCategorySimple(40)).toBe('obésité de grade III')
})

test('40 <= imc < 45 = "obésité de grade III"', () => {
    expect(IMCCategorySimple(44.99)).toBe('obésité de grade III')
})

test('imc >= 45 = "obésité de grade IV"', () => {
    expect(IMCCategorySimple(45)).toBe('obésité de grade IV')
})

test('imc >= 45 = "obésité de grade IV"', () => {
    expect(IMCCategorySimple(50)).toBe('obésité de grade IV')
})

// TEST IMCCategory---------------------------------------------------
test('imc < 18,5 = "un état de maigreur"', () => {
    expect(IMCCategory(1)).toBe('un état de maigreur')
})

test('imc < 18,5 = "un état de maigreur"', () => {
    expect(IMCCategory(18.49)).toBe('un état de maigreur')
})

test('18,5 <= imc < 25 = "un équilibre staturo-pondéral"', () => {
    expect(IMCCategory(18.5)).toBe('un équilibre staturo-pondéral')
})

test('18,5 <= imc < 25 = "un équilibre staturo-pondéral"', () => {
    expect(IMCCategory(24.99)).toBe('un équilibre staturo-pondéral')
})

test('25 <= imc < 30 = "un surpoids"', () => {
    expect(IMCCategory(25)).toBe('un surpoids')
})

test('25 <= imc < 30 = "un surpoids"', () => {
    expect(IMCCategory(29.99)).toBe('un surpoids')
})

test('30 <= imc < 35 = "une obésité de grade I"', () => {
    expect(IMCCategory(30)).toBe('une obésité de grade I')
})

test('30 <= imc < 35 = "une obésité de grade I"', () => {
    expect(IMCCategory(34.99)).toBe('une obésité de grade I')
})

test('35 <= imc < 40 = "une obésité de grade II"', () => {
    expect(IMCCategory(35)).toBe('une obésité de grade II')
})

test('35 <= imc < 40 = "une obésité de grade II"', () => {
    expect(IMCCategory(39.99)).toBe('une obésité de grade II')
})

test('40 <= imc < 45 = "une obésité de grade III"', () => {
    expect(IMCCategory(40)).toBe('une obésité de grade III')
})

test('40 <= imc < 45 = "une obésité de grade III"', () => {
    expect(IMCCategory(44.99)).toBe('une obésité de grade III')
})

test('imc >= 45 = "une obésité de grade IV"', () => {
    expect(IMCCategory(45)).toBe('une obésité de grade IV')
})

test('imc >= 45 = "une obésité de grade IV"', () => {
    expect(IMCCategory(50)).toBe('une obésité de grade IV')
})