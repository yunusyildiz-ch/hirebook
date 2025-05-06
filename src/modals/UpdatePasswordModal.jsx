import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { toast } from "react-hot-toast";
import PasswordInput from "@/components/ui/PasswordInput";
import { validateResetPasswordForm } from "@/utils/validators"; 
import { X } from "lucide-react";

export default function UpdatePasswordModal({ isOpen, onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
  
    const validationError = validateResetPasswordForm(newPassword); // ✅
    if (validationError) {
      toast.error(validationError); // kullanıcıya mesaj göster
      return;
    }
  
    try {
      setLoading(true);
      await updatePassword(auth.currentUser, newPassword);
      toast.success("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      onClose(); // ✅ modal kapat
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error("Password update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          🔐 Set a New Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Please enter your new password and confirm it.
        </p>

        <div className="space-y-3">
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={loading}
          />
          <PasswordInput
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="w-full mt-6 py-2 px-4 rounded bg-skyBlue hover:bg-skyBorder text-white font-semibold transition"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
}