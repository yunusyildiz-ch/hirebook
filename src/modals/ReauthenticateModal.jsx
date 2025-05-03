import { useState } from "react";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "@services/firebase/config";
import { toast } from "react-hot-toast";
import PasswordInput from "@components/ui/PasswordInput";

export default function ReauthenticateModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const user = auth.currentUser;

  if (!isOpen) return null;

  const handleReauth = async () => {
    if (!user?.email) return;

    try {
      setLoading(true);
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      toast.success("Re-authenticated successfully");
      onClose();
      onSuccess(); // 🧨 proceed with destructive action
    } catch (error) {
      console.error("❌ Re-authentication failed:", error);
      toast.error("Incorrect password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-sm w-full shadow-xl space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          🔐 Confirm with Password
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          For security reasons, please re-enter your password to continue.
        </p>

        <PasswordInput
          label="Password"
          showStrength={false}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleReauth}
            disabled={loading || !password}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            {loading ? "Verifying..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}