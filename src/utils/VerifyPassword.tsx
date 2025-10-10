import { PasswordValidation } from "@/types/PasswordValidation";

export const VerifyPassword = (password: string): PasswordValidation => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasNum = /[0123456789]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        minLength,
        hasUppercase,
        hasNum,
        hasSpecialChar
    };
};