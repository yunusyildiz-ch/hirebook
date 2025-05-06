import { useState } from "react";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "@services/firebase/config";
import { toast } from "react-hot-toast";
import PasswordInput from "@components/ui/PasswordInput";

export default function PasswordReauthModal({ isOpen, onCancel, onConfirm }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!auth.currentUser?.email) return toast.error("Missing user email.");
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      onConfirm();
    } catch (error) {
      console.error("Reauthentication failed", error);
      toast.error("Incorrect password or session expired.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-full max-w-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Confirm Your Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          To permanently delete your account, please confirm your password.
        </p>

        <PasswordInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            {loading ? "Verifying..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
