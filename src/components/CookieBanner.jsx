import React, { useState, useEffect } from "react";
import { isConsentGiven } from "../utils/cookieUtils";
import { useCookieConsent } from "../hooks/useCookieConsent";
import CookieModal from "../modals/CookieModal";
import { Settings2, CheckCircle, XCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { acceptAll, rejectAll } = useCookieConsent();

  // Show banner only if user hasn't made a choice and hasn't dismissed the banner
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isConsentGiven() && !dismissed) {
        setVisible(true);
      }
    }, 1000); // Delay for UX

    return () => clearTimeout(timer);
  }, [dismissed]);

  const handleAccept = () => {
    acceptAll();
    setVisible(false);
  };

  const handleReject = () => {
    rejectAll();
    setVisible(false);
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true); // Will be lost on refresh → shows again
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="fixed bottom-4 left-4 right-4 sm:left-8 sm:right-8 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 sm:p-6 border rounded-xl shadow-2xl z-50"
          >
            {/* Dismiss (X) button */}
            <button
              onClick={handleDismiss}
              className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-lg p-1.5 z-10 hover:bg-gray-100 dark:hover:bg-gray-600 transition"
              aria-label="Dismiss cookie banner"
            >
              <X size={16} className="text-gray-700 dark:text-white" />
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm sm:text-base max-w-2xl pr-6">
                <strong>We use cookies</strong> to improve your experience,
                personalize content, and analyze traffic. You can accept all
                cookies or manage your preferences. See our{" "}
                <a
                  href="/legal/cookies"
                  className="underline underline-offset-2 hover:text-blue-500"
                >
                  Cookie Policy
                </a>
                .
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={handleReject}
                  className="w-full sm:w-auto flex items-center justify-center gap-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  <XCircle size={16} /> Reject
                </button>

                <button
                  onClick={handleAccept}
                  className="w-full sm:w-auto flex items-center justify-center gap-1 bg-greenPrimary text-white px-3 py-1.5 rounded-lg text-sm hover:bg-greenHover transition"
                >
                  <CheckCircle size={16} /> Accept All
                </button>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-1 bg-skyBlue text-white px-3 py-1.5 rounded-lg text-sm hover:bg-skyBorder transition"
                >
                  <Settings2 size={16} /> Preferences
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showModal && <CookieModal onClose={() => setShowModal(false)} />}
    </>
  );
}
