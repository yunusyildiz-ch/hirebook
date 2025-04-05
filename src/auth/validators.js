// src/auth/validators.js

export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const validateLoginForm = (email, password) => {
  if (!email || !password) return "Please fill in all fields.";
  if (!validateEmail(email)) return "Please enter a valid email address.";
  if (password.length < 6) return "Password must be at least 6 characters.";
  return null;
};

// Use the same logic for now
export const validateRegisterForm = validateLoginForm;