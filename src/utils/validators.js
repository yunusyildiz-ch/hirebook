// src/utils/validators.js

export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

export const validateLoginForm = (email, password) => {
  if (!email || !password) return "Please fill in all fields.";
  if (!validateEmail(email)) return "Please enter a valid email address.";
  if (!validatePassword(password)) return "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, and 1 number.";
  return null;
};

export const validateRegisterForm = validateLoginForm;