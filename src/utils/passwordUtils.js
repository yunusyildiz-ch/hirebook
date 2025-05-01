export const getPasswordStrength = (password) => {
    if (!password) return "empty";
    if (password.length < 6) return "weak";
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) return "strong";
    return "medium";
  };