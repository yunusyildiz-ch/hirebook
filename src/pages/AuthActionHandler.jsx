import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import QatipCatLogo from "@assets/QatipCatLogo";
import ThemeToggle from "@components/ThemeToggle";
import { Loader2 } from "lucide-react";

export default function AuthActionHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [status, setStatus] = useState("loading"); // loading | verifySuccess | resetReady | resetSuccess | error
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  useEffect(() => {
    if (!mode || !oobCode) {
      setStatus("error");
      setErrorMessage("Invalid or missing action link.");
      return;
    }

    handleAction(mode, oobCode);
  }, [mode, oobCode]);

  const handleAction = async (mode, oobCode) => {
    try {
      if (mode === "verifyEmail") {
        await applyActionCode(auth, oobCode);
        await refreshUser();
        setStatus("verifySuccess");
      } else if (mode === "resetPassword") {
        await verifyPasswordResetCode(auth, oobCode); // sadece kod geçerli mi kontrolü
        setStatus("resetReady");
      } else if (mode === "recoverEmail") {
        await applyActionCode(auth, oobCode);
        setStatus("verifySuccess");
      } else {
        setStatus("error");
        setErrorMessage("Unsupported operation.");
      }
    } catch (error) {
      console.error("AuthAction error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  const handlePasswordReset = async () => {
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password has been reset successfully! 🎉");
      setStatus("resetSuccess");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(error.message || "Password reset failed.");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-6 relative dark:bg-gray-900 dark:text-white">

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Logo */}
      <div className="mb-8">
        <QatipCatLogo className="w-20 h-20 text-gray-800 dark:text-white" />
      </div>

      {/* UI */}
      {status === "loading" && (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
          <h1 className="text-2xl font-semibold animate-pulse">Processing your request...</h1>
        </div>
      )}

      {status === "verifySuccess" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-green-500">Action Successful! 🎉</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your email has been verified or recovered successfully.
          </p>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Go to Home
          </button>
        </>
      )}

      {status === "resetReady" && (
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4 text-blue-500">Reset Your Password 🔒</h1>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-4 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <button
            onClick={handlePasswordReset}
            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Set New Password
          </button>
        </div>
      )}

      {status === "resetSuccess" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-green-500">Password Reset Successful! 🎉</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You can now login with your new password.
          </p>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Go to Home
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-red-500">Something Went Wrong ❌</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{errorMessage}</p>
          <button
            onClick={handleGoHome}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
          >
            Back to Home
          </button>
        </>
      )}
    </div>
  );
}