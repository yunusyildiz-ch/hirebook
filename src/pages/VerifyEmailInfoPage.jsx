import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import QatipCatLogo from "@/assets/QatipCatLogo";
import { 
  getRemainingCooldown, 
  startCooldownTimer, 
  startCooldownCountdown, 
  COOLDOWN_TIME 
} from "@/utils/cooldownUtils";

export default function VerifyEmailInfoPage() {
  const { resendVerificationEmail } = useAuth();
  
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  // 🔥 On page load, check or start cooldown
  useEffect(() => {
    const start = localStorage.getItem("verifyCooldownStart");
    if (!start) {
      startCooldownTimer();
      setCooldown(COOLDOWN_TIME);
    } else {
      const remaining = getRemainingCooldown();
      setCooldown(remaining);
    }
  }, []);

  // ⏱ Handle countdown ticking
  useEffect(() => {
    if (cooldown > 0) {
      const clearTimer = startCooldownCountdown(setCooldown);
      return () => clearTimer();
    }
  }, [cooldown]);

  const handleResend = async () => {
    setResending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email sent again! 📩");

      startCooldownTimer();
      setCooldown(COOLDOWN_TIME);
    } catch (error) {
      toast.error("Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const isButtonDisabled = cooldown > 0 || resending;

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-6 relative dark:bg-gray-900 dark:text-white">
      {/* Theme toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Logo */}
      <div className="mb-8">
        <QatipCatLogo className="w-20 h-20 text-gray-800 dark:text-white" />
      </div>

      {/* Text Content */}
      <h1 className="text-2xl font-bold mb-4 text-blue-500">Verify Your Email 📩</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        We have sent a verification link to your email address.
        <br />
        Please check your inbox and click on the link to verify your account.
      </p>

      {/* Cooldown info */}
      {cooldown > 0 && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
          You can resend in {cooldown}s
        </div>
      )}

      {/* Resend button */}
      <button
        onClick={handleResend}
        disabled={isButtonDisabled}
        className={`px-6 py-3 font-semibold rounded-lg transition flex items-center justify-center
          ${isButtonDisabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"}`}
      >
        {resending ? (
          <>
            <Loader2 className="animate-spin mr-2 w-5 h-5" /> Sending...
          </>
        ) : (
          "Resend Verification Email"
        )}
      </button>
    </div>
  );
}