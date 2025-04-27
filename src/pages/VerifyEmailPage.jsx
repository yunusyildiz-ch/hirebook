import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { toast } from "react-hot-toast";
import QatipCatLogo from "@/assets/QatipCatLogo";
import ThemeToggle from "@/components/ThemeToggle";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    const oobCode = searchParams.get("oobCode");
    const mode = searchParams.get("mode");

    if (mode === "verifyEmail" && oobCode) {
      verifyEmail(oobCode);
    } else {
      setVerifying(false);
      setVerificationError("Invalid verification link.");
    }
  }, []);

  const verifyEmail = async (oobCode) => {
    try {
      await applyActionCode(auth, oobCode);
      toast.success("Email verified successfully! 🎉");
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationError("Verification failed. Please try again or request a new link.");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-4 relative dark:bg-gray-900 dark:text-white">

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Logo */}
      <div className="mb-8">
        <QatipCatLogo className="w-16 h-16 text-gray-800 dark:text-white" />
      </div>

      {/* Content */}
      {verifying ? (
        <h1 className="text-2xl font-semibold animate-pulse">Verifying your email...</h1>
      ) : verificationError ? (
        <>
          <h1 className="text-2xl font-bold mb-4 text-red-500">Verification Failed ❌</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{verificationError}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 text-green-500">Email Verified! 🎉</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Your email has been successfully verified.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go to Home
          </button>
        </>
      )}
    </div>
  );
}