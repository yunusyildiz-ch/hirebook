import { toast } from "react-hot-toast";

// ✅ Success Toast
export const showSuccess = (message) => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
  });
};

// ❌ Error Toast
export const showError = (message = "Something went wrong") => {
  toast.error(message, {
    duration: 4000,
    position: "top-right",
  });
};

// 💡 Info Toast
export const showInfo = (message) => {
  toast(message, {
    duration: 3000,
    position: "top-right",
    icon: "ℹ️",
  });
};

// 🔄 Loading Toast (returns id for dismissing later)
export const showLoading = (message) => {
  return toast.loading(message, {
    position: "top-right",
  });
};

// ✅ Dismiss toast manually (optional)
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};