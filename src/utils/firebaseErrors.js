
export const getFirebaseErrorMessage = (code) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/weak-password":
        return "Password must be at least 6 characters.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/too-many-requests":
        return "Too many login attempts. Try again later.";
      case "auth/network-request-failed":
        return "Network error. Check your internet connection.";
      case "auth/operation-not-allowed":
        return "This type of account is not enabled.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };