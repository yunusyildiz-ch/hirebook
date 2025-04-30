export const FIREBASE_ERRORS = {
  // Authentication (sign-in / sign-up)
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "Invalid email format.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/operation-not-allowed": "Email/password signups are not enabled.",
  "auth/user-not-found": "No user found with this email.",
  "auth/invalid-credential": "Email or password is incorrect.",
  "auth/wrong-password": "Incorrect password.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Please check your connection.",

  // Email verification & password reset links
  "auth/invalid-action-code": "This link is invalid or has already been used.",
  "auth/expired-action-code": "This link has expired. Please request a new one.",
  "auth/user-disabled": "This account has been disabled. Contact support.",
  "auth/missing-action-code": "The action code is missing in the link.",
  "auth/internal-error": "An internal error occurred. Please try again later.",
  "auth/requires-recent-login": "Please sign in again to perform this action.",
  "auth/invalid-verification-code": "Invalid verification code. Try again.",
  "auth/invalid-phone-number": "The phone number is invalid.",
  "auth/credential-already-in-use": "This account is already linked with another method.",

  // Account management
  "auth/email-already-exists": "An account with this email already exists.",
  "auth/invalid-password": "Password must meet the minimum requirements.",
  "auth/user-token-expired": "Session has expired. Please sign in again.",
};

// 🔥 Global error handler to safely retrieve readable message
export const getFirebaseErrorMessage = (codeOrMessage) => {
  if (!codeOrMessage) return "An unknown error occurred. Please try again.";
  return FIREBASE_ERRORS[codeOrMessage] || codeOrMessage || "An unexpected error occurred. Please try again.";
};