import { expect, test } from "vitest";
import { VerifyPassword } from "./VerifyPassword";

test('true : valid password', () => {
    expect(VerifyPassword("123ABCdef!@#")).toStrictEqual({
        minLength: true,
        hasUppercase: true,
        hasNum: true,
        hasSpecialChar: true
    }
    )
})

test('false : password too short', () => {
    expect(VerifyPassword("1Ad!")).toStrictEqual({
        minLength: false,
        hasUppercase: true,
        hasNum: true,
        hasSpecialChar: true
    }
    )
})

test('false : password without upperCase', () => {
    expect(VerifyPassword("123def!@#")).toStrictEqual({
        minLength: true,
        hasUppercase: false,
        hasNum: true,
        hasSpecialChar: true
    }
    )
})

test('false : password without number', () => {
    expect(VerifyPassword("ABCdef!@#")).toStrictEqual({
        minLength: true,
        hasUppercase: true,
        hasNum: false,
        hasSpecialChar: true
    }
    )
})

test('false : password without special charater', () => {
    expect(VerifyPassword("123ABCdef")).toStrictEqual({
        minLength: true,
        hasUppercase: true,
        hasNum: true,
        hasSpecialChar: false
    }
    )
})

test('false : password is empty', () => {
    expect(VerifyPassword("")).toStrictEqual({
        minLength: false,
        hasUppercase: false,
        hasNum: false,
        hasSpecialChar: false
    }
    )
})