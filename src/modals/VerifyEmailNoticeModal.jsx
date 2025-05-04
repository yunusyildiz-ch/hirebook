// ✅ src/modals/VerifyEmailNoticeModal.jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, Loader2, MailCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import {
  getRemainingCooldown,
  startCooldownTimer,
  startCooldownCountdown,
  COOLDOWN_TIME,
} from "@/utils/cooldownUtils";
import QatipCatLogo from "@/assets/QatipCatLogo";

export default function VerifyEmailNoticeModal({ isOpen, email, onClose }) {
  const { resendVerificationEmail } = useAuth();
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const start = localStorage.getItem("verifyCooldownStart");
    if (!start) {
      startCooldownTimer();
      setCooldown(COOLDOWN_TIME);
    } else {
      const remaining = getRemainingCooldown();
      setCooldown(remaining);
    }
  }, [isOpen]);

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
      toast.success("Verification email resent! 📩");
      startCooldownTimer();
      setCooldown(COOLDOWN_TIME);
    } catch (err) {
      toast.error("Failed to resend verification email.");
    } finally {
      setResending(false);
    }
  };

  const isButtonDisabled = cooldown > 0 || resending;

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl max-w-md w-full relative text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <QatipCatLogo className="w-16 h-16 mx-auto text-gray-800 dark:text-white mb-4" />

        <MailCheck className="w-12 h-12 text-green-600 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Verify Your Email 📩</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          We have sent a verification link to:
        </p>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{email}</p>

        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          Please check your inbox and click the link to activate your account.<br />
          After verifying, you can close this window.
        </p>

        {cooldown > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Resend available in {cooldown}s
          </p>
        )}

        <button
          onClick={handleResend}
          disabled={isButtonDisabled}
          className={`w-full py-2 mt-2 rounded-lg font-semibold text-white transition flex items-center justify-center ${
            isButtonDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {resending ? (
            <>
              <Loader2 className="animate-spin w-4 h-4 mr-2" /> Sending...
            </>
          ) : (
            "Resend Verification Email"
          )}
        </button>
      </div>
    </div>,
    document.body
  );
}
