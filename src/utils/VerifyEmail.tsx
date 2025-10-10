export function VerifyEmail(email: string) {
    const split_email = email.split("@")
    if (split_email.length !== 2) {
        return false
    } else if (split_email[0].length === 0 || split_email[1].length === 0 || split_email[0].includes(" ") || split_email[1].includes(" ") || !split_email[1].includes(".")) {
        return false
    } else {
        return true
    }
}