import { expect, test } from "vitest";
import { VerifyEmail } from "./VerifyEmail";

test('true : valid email', () => {
    expect(VerifyEmail("nomprenom@mail.com")).toBe(true)
})

test('false : miss the "@"', () => {
    expect(VerifyEmail("nomprenom.com")).toBe(false)
})

test('false : more than one "@"', () => {
    expect(VerifyEmail("nom@prenom@mail.com")).toBe(false)
})

test('false : "@" is only at the end', () => {
    expect(VerifyEmail("nomprenom.com@")).toBe(false)
})

test('false : "@" is only at the begining', () => {
    expect(VerifyEmail("@nomprenom.com")).toBe(false)
})

test('false : there is 2 "@" next to each other', () => {
    expect(VerifyEmail("nomprenom@@mail.com")).toBe(false)
})

test('false : the domain part miss the "."', () => {
    expect(VerifyEmail("nomprenom@mail")).toBe(false)
})

test('false : there is a " " in the mail address (1)', () => {
    expect(VerifyEmail("nomprenom@m ail")).toBe(false)
})

test('false : there is a " " in the mail address (2)', () => {
    expect(VerifyEmail("nom prenom@mail")).toBe(false)
})