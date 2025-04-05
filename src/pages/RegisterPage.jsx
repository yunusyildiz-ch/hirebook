import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useRegister } from "../auth/useRegister";
import { validateRegisterForm } from "../auth/validators";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { handleRegister, authLoading } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateRegisterForm(email, password);
    if (validationError) {
      toast.error(validationError);
      return;
    }
    await handleRegister(email, password, setError);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
          Create an Account 📋
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
            disabled={authLoading}
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

        <p className="text-sm text-center mt-4 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
