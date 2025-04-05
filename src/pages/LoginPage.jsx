import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useLogin } from "../auth/useLogin";
import { validateLoginForm } from "../auth/validators";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateLoginForm(email, password);
    if (validationError) return alert(validationError);

    handleLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Welcome Back 👋
        </h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="flex items-center gap-2 mb-1 text-gray-700 dark:text-gray-300">
            <Mail size={18} /> Email
          </label>
          <input
            type="email"
            className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2 mb-1 text-gray-700 dark:text-gray-300">
            <Lock size={18} /> Password
          </label>
          <input
            type="password"
            className="w-full p-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 dark:text-gray-300">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}