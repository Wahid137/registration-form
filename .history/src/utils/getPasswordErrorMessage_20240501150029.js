
export const getPasswordErrorMessage = (value) => {
    if (value.length < 3 || value.length > 30) {
        return "Password must be 3 to 30 characters long";
    }
    if (!/[a-z]/.test(value)) {
        return "Password must contain at least one lowercase letter";
    }
    if (!/[A-Z]/.test(value)) {
        return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(value)) {
        return "Password must contain at least one digit";
    }
    return "";
};
