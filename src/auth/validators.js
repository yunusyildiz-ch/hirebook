export const validateEmail = (email) => {
  const regex = /^\S+@\S+\.\S+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateLoginForm = (email, password) => {
  if (!email || !password) return "Please fill in all fields.";
  if (!validateEmail(email)) return "Please enter a valid email address.";
  if (!validatePassword(password)) return "Password must be at least 6 characters.";
  return null;
};

export const validateRegisterForm = validateLoginForm; // same rules for now