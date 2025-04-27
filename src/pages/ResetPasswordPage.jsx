import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "@services/firebase/config";
import { validatePassword } from "@utils/validators";
import { toast } from "react-hot-toast";

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeValid, setCodeValid] = useState(false);
  const [error, setError] = useState("");

  const oobCode = searchParams.get("oobCode");

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then(() => setCodeValid(true))
        .catch(() => {
          toast.error("Invalid or expired reset link.");
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [oobCode, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!validatePassword(newPassword)) {
      setError("Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 number.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password reset successful! Please log in.");
      navigate("/");
    } catch (err) {
      toast.error("Failed to reset password. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!codeValid) {
    return null; // ✅ Kod doğrulanmadan formu gösterme
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">Reset Your Password 🔒</h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
            <input
              type="password"
              className="w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={`w-full p-2 rounded-lg text-white transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}