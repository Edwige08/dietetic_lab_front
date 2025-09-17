import { expect, test } from 'vitest';
import { getDate, getHour, monthInLetters } from './GetDate';

test('"2025-09-09T09:14:10.532784Z" donne 9 septembre 2025', () => {
    expect(getDate("2025-09-09T09:14:10.532784Z")).toBe('9 septembre 2025')
})

test('"2025-09-09T09:14:10.532784Z" donne 11h14', () => {
    expect(getHour("2025-09-09T09:14:10.532784Z")).toBe('11h14')
})

test('"2025-09-09T09:04:10.532784Z" donne 11h04', () => {
    expect(getHour("2025-09-09T09:04:10.532784Z")).toBe('11h04')
})

test('"2025-09-09T07:04:10.532784Z" donne 9h04', () => {
    expect(getHour("2025-09-09T07:04:10.532784Z")).toBe('9h04')
})

test('0 donne janvier', () => {
    expect(monthInLetters(0)).toBe('janvier')
})
test('1 donne février', () => {
    expect(monthInLetters(1)).toBe('février')
})
test('2 donne mars', () => {
    expect(monthInLetters(2)).toBe('mars')
})
test('3 donne avril', () => {
    expect(monthInLetters(3)).toBe('avril')
})
test('4 donne mai', () => {
    expect(monthInLetters(4)).toBe('mai')
})
test('5 donne juin', () => {
    expect(monthInLetters(5)).toBe('juin')
})
test('6 donne juillet', () => {
    expect(monthInLetters(6)).toBe('juillet')
})
test('7 donne août', () => {
    expect(monthInLetters(7)).toBe('août')
})
test('8 donne septembre', () => {
    expect(monthInLetters(8)).toBe('septembre')
})
test('9 donne octobre', () => {
    expect(monthInLetters(9)).toBe('octobre')
})
test('10 donne novembre', () => {
    expect(monthInLetters(10)).toBe('novembre')
})
test('11 donne décembre', () => {
    expect(monthInLetters(11)).toBe('décembre')
})