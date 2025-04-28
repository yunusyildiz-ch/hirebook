import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import QatipCatLogo from "@/assets/QatipCatLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { refreshUser, resendVerificationEmail } = useAuth();
  const [status, setStatus] = useState("verifying"); // verifying | success | error | info
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    if (mode === "verifyEmail" && oobCode) {
      verifyEmail(oobCode);
    } else {
      setStatus("info");
    }
  }, []);

  const verifyEmail = async (oobCode) => {
    try {
      await applyActionCode(auth, oobCode);
      await refreshUser();
      setStatus("success");
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("error");
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email sent again! 📩");
    } catch (error) {
      toast.error("Failed to resend verification email.");
    } finally {
      setResending(false);
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

      {/* Content */}
      {status === "verifying" && (
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
          <h1 className="text-2xl font-semibold animate-pulse">
            Verifying your email...
          </h1>
        </div>
      )}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-green-500">Email Verified! 🎉</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Your email has been successfully verified.
          </p>
          <button
            onClick={handleGoHome}
            className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
          >
            Go to Dashboard
          </button>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-red-500">Verification Failed ❌</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The verification link is invalid or expired.
          </p>
          <div className="flex flex-col gap-4">
            <button
              onClick={handleResend}
              disabled={resending}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center justify-center"
            >
              {resending ? (
                <>
                  <Loader2 className="animate-spin mr-2 w-5 h-5" /> Sending...
                </>
              ) : (
                "Resend Verification Email"
              )}
            </button>
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        </>
      )}

      {status === "info" && (
        <>
          <h1 className="text-2xl font-bold mb-4 text-blue-500">Check Your Email 📩</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We've sent a verification link to your email address.
          </p>
          <button
            onClick={handleResend}
            disabled={resending}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition flex items-center justify-center"
          >
            {resending ? (
              <>
                <Loader2 className="animate-spin mr-2 w-5 h-5" /> Sending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </button>
        </>
      )}
    </div>
  );
}