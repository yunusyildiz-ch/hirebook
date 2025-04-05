export const FIREBASE_ERRORS = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/invalid-email": "Invalid email format.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/operation-not-allowed": "Email/password signups are not enabled.",
  "auth/user-not-found": "No user found with this email.",
  "auth/wrong-password": "Incorrect password.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
};

// 🔥 Global error handler to safely retrieve readable message
export const getFirebaseErrorMessage = (code) => {
  return FIREBASE_ERRORS[code] || "An unexpected error occurred. Please try again.";
};