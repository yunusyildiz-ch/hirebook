// src/pages/VerifyEmailInfo.jsx
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import QatipCatLogo from "@/assets/QatipCatLogo";

export default function VerifyEmailInfoPage() {
  const { resendVerificationEmail } = useAuth();
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email sent again! 📩");
      startCooldown(60); // 🕒 60 saniye bekleme başlat
    } catch (error) {
      toast.error("Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const startCooldown = (seconds) => {
    setCooldown(seconds);
  };

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

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
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Verify Your Email 📩</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We have sent a verification link to your email address.
        <br />
        Please check your inbox and click on the link to verify your account.
      </p>

      <button
        onClick={handleResend}
        disabled={resending || cooldown > 0}
        className={`px-6 py-3 font-semibold rounded-lg transition flex items-center justify-center
          ${resending || cooldown > 0 
            ? "bg-blue-400 cursor-not-allowed" 
            : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
      >
        {resending ? (
          <>
            <Loader2 className="animate-spin mr-2 w-5 h-5" /> Sending...
          </>
        ) : cooldown > 0 ? (
          `Resend in ${cooldown}s`
        ) : (
          "Resend Verification Email"
        )}
      </button>
    </div>
  );
}