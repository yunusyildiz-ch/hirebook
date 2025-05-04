import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  applyActionCode,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import QatipCatLogo from "@assets/QatipCatLogo";
import ThemeToggle from "@components/ThemeToggle";
import { Loader2 } from "lucide-react";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";
import { validateResetPasswordForm } from "@/utils/validators";
import PasswordInput from "@/components/ui/PasswordInput";

export default function AuthActionHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const oobCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  useEffect(() => {
    const checkAndHandleAction = async () => {
      if (!mode || !oobCode) {
        setStatus("error");
        setErrorMessage("Invalid or missing action link.");
        return;
      }

      await handleAction(mode, oobCode);
    };

    checkAndHandleAction();
  }, [mode, oobCode]);

  const handleAction = async (mode, oobCode) => {
    try {
      if (mode === "verifyEmail") {
        await applyActionCode(auth, oobCode);
        await refreshUser();
        localStorage.removeItem("verifyCooldownStart");

        // ✅ Parent sekmeye kapatma sinyali
        localStorage.setItem("closeParentTab", "true");

        // ✅ Kullanıcıya mesaj göster
        setStatus("verifySuccess");

        // ✅ Yönlendirme
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } else if (mode === "resetPassword") {
        await verifyPasswordResetCode(auth, oobCode);
        setStatus("resetReady");

      } else if (mode === "recoverEmail") {
        await applyActionCode(auth, oobCode);
        setStatus("verifySuccess");
        setTimeout(() => navigate("/dashboard"), 2500);

      } else {
        setStatus("error");
        setErrorMessage("Unsupported operation.");
      }

    } catch (error) {
      console.error("AuthAction error:", error);
      setStatus("error");
      setErrorMessage(getFirebaseErrorMessage(error.code || error.message));
    }
  };

  const handlePasswordReset = async () => {
    const validationError = validateResetPasswordForm(newPassword);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      toast.success("Password has been reset successfully! 🎉");

      // ✅ Parent sekmeye kapatma sinyali
      localStorage.setItem("closeParentTab", "true");

      // ✅ Mesaj göster → yönlendirme
      setStatus("resetSuccess");
      setTimeout(() => navigate("/dashboard"), 2500);

    } catch (error) {
      toast.error(getFirebaseErrorMessage(error.code || error.message));
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-6 relative dark:bg-gray-900 dark:text-white">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="mb-8">
        <QatipCatLogo className="w-20 h-20 text-gray-800 dark:text-white" />
      </div>

      {status === "loading" && (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
          <h1 className="text-2xl font-semibold animate-pulse">
            Processing your request...
          </h1>
        </div>
      )}

      {status === "verifySuccess" && (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold text-green-500">
            Email Verified! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            You’re being redirected to your dashboard...
          </p>
          <Loader2 className="animate-spin w-6 h-6 text-green-600" />
        </div>
      )}

      {status === "resetReady" && (
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4 text-blue-500">
            Reset Your Password 🔒
          </h1>
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
          <button
            onClick={handlePasswordReset}
            className="w-full px-6 py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Set New Password
          </button>
        </div>
      )}

      {status === "resetSuccess" && (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-bold text-green-500">
            Password Reset Successful! 🎉
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Redirecting you to the login page...
          </p>
          <Loader2 className="animate-spin w-6 h-6 text-green-600" />
        </div>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-red-500">
            Something Went Wrong ❌
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {errorMessage}
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
          >
            Back to Home
          </button>
        </>
      )}
    </div>
  );
}
