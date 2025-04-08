import { useState } from "react";
import ReactDOM from "react-dom";
import { X, Mail, Lock } from "lucide-react";
import { useRegister } from "../auth/useRegister";
import { validateRegisterForm } from "../utils/validators";
import { toast } from "react-hot-toast";

export default function RegisterModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleRegister, authLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateRegisterForm(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    await handleRegister(email, password, setError);
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Create an Account 📋
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
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {authLoading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          By signing up, you agree to the Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>,
    document.body
  );
}
