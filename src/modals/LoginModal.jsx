import { useState } from "react";
import ReactDOM from "react-dom";
import { Mail, Lock, X } from "lucide-react";
import { useLogin } from "@hooks/useLogin";
import { validateLoginForm } from "../utils/validators";

const modalRoot = document.getElementById("modal-root") || document.body;

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, authLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateLoginForm(email, password);
    if (validationError) return;
    await handleLogin(email, password);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        {/* Close button */}
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
              className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={authLoading}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-1 text-gray-700 dark:text-gray-300">
              <Lock size={18} /> Password
            </label>
            <input
              type="password"
              className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={authLoading}
            />
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className={`w-full text-white p-2 rounded-lg transition ${
              authLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {authLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6 dark:text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>,
    modalRoot
  );
}
