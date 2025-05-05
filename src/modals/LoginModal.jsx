// ✅ LoginModal.jsx
import { useState } from "react";
import ReactDOM from "react-dom";
import { Mail, X } from "lucide-react";
import { useLogin } from "@hooks/useLogin";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { validateLoginForm } from "@utils/validators";
import PasswordInput from "@/components/ui/PasswordInput";

const modalRoot = document.getElementById("modal-root") || document.body;

export default function LoginModal({ onClose, onResetRequested }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, authLoading } = useLogin();
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateLoginForm(email, password);
    if (validationError) return;
    await handleLogin(email, password);
  };

  if (showForgotModal) {
    return (
      <ForgotPasswordModal
        onClose={() => setShowForgotModal(false)}
        onBackToLogin={() => setShowForgotModal(false)}
        onSent={(email) => {
          setShowForgotModal(false);
          setTimeout(() => {
            onResetRequested(email);
          }, 100);
        }}
      />
    );
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Sign In 🔐
        </h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 mb-1 text-gray-700 dark:text-gray-300">
              <Mail size={18} /> Email
            </label>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:ring-1 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={authLoading}
            />
          </div>

          <div>
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={authLoading}
              showStrength={false}
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className={`w-full text-white p-2 rounded-lg transition ${
              authLoading ? "bg-blue-400 cursor-not-allowed" : "bg-skyBlue hover:bg-skyBorder"
            }`}
          >
            {authLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-sm text-center mt-4">
          <button
            onClick={() => setShowForgotModal(true)}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
