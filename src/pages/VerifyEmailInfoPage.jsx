import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import QatipCatLogo from "@/assets/QatipCatLogo";

const COOLDOWN_SECONDS = 60; // Cooldown süresi

export default function VerifyEmailInfoPage() {
  const { resendVerificationEmail } = useAuth();
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    initializeCooldown();
  }, []);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const initializeCooldown = () => {
    const startTime = localStorage.getItem("verifyCooldownStart");
    if (startTime) {
      const elapsed = Math.floor((Date.now() - parseInt(startTime, 10)) / 1000);
      const remaining = COOLDOWN_SECONDS - elapsed;
      if (remaining > 0) {
        setCooldown(remaining);
      } else {
        localStorage.removeItem("verifyCooldownStart");
      }
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) {
      toast.error(`Please wait ${cooldown}s before resending.`);
      return;
    }

    setResending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email sent again! 📩");

      // Yeni cooldown başlat
      const now = Date.now();
      localStorage.setItem("verifyCooldownStart", now.toString());
      setCooldown(COOLDOWN_SECONDS);
    } catch (error) {
      toast.error("Failed to resend verification email.");
    } finally {
      setResending(false);
    }
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

      {/* Main Content */}
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Verify Your Email 📩</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We have sent a verification link to your email address.
        <br />
        Please check your inbox and click on the link to verify your account.
      </p>

      <button
        onClick={handleResend}
        disabled={cooldown > 0 || resending}
        className={`px-6 py-3 font-semibold rounded-lg transition flex items-center justify-center 
          ${cooldown > 0 || resending
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-blue-600 hover:bg-blue-700 text-white"}`}
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