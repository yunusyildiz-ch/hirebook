import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

export default function VerifyEmailPage() {
  const { resendVerificationEmail } = useAuth();
  const [sending, setSending] = useState(false);

  const handleResend = async () => {
    setSending(true);
    try {
      await resendVerificationEmail();
      toast.success("Verification email sent again! 📩");
    } catch (error) {
      toast.error("Failed to resend. Try again later.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center p-4 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">📩 Verify Your Email</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        We have sent a verification link to your email address.
      </p>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Please check your inbox and click on the verification link.
      </p>

      {/* Resend Button */}
      <button
        onClick={handleResend}
        disabled={sending}
        className={`px-4 py-2 rounded-lg font-semibold ${
          sending
            ? "bg-blue-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } text-white transition`}
      >
        {sending ? "Sending..." : "Resend Verification Email"}
      </button>

      <p className="mt-6 text-gray-400 text-sm">
        After verifying, refresh the page or login again.
      </p>
    </div>
  );
}