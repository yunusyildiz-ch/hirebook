import { useState } from "react";
import ReactDOM from "react-dom";
import { X, Mail, ArrowLeft } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { toast } from "react-hot-toast";

export default function ForgotPasswordModal({ onClose, onBackToLogin, onSent }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const modalRoot = document.getElementById("modal-root") || document.body;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.dismiss(); // clear existing toasts
      toast.success("Password reset email sent! 📩");
      onSent(email);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send reset email. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500">
          <X size={20} />
        </button>

        <button onClick={onBackToLogin} className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600">
          <ArrowLeft size={18} /> Back to Sign In
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Forgot Password 🔑</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-1 text-gray-700 dark:text-gray-300">
              <Mail size={18} /> Email Address
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white p-2 rounded-lg transition ${
              loading ? "bg-blue-400 cursor-not-allowed" : "bg-skyBlue hover:bg-skyBorder"
            }`}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6 dark:text-gray-400">
          Enter your email address to receive a password reset link.
        </p>
      </div>
    </div>,
    modalRoot
  );
}