import React, { useState, useEffect } from "react";
import { isConsentGiven } from "../utils/cookieUtils";
import { useCookieConsent } from "../hooks/useCookieConsent";
import CookieModal from "../modals/CookieModal";
import { Settings2, CheckCircle, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { acceptAll, rejectAll } = useCookieConsent();

  // Delay banner appearance slightly for smoother UX
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isConsentGiven()) {
        setVisible(true);
      }
    }, 1000); // 0.6s delay before showing banner

    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    acceptAll();
    setVisible(false);
  };

  const handleReject = () => {
    rejectAll();
    setVisible(false);
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-sm sm:text-base max-w-2xl">
                <strong>We use cookies</strong> to improve your experience, personalize content, and analyze traffic.
                You can accept all cookies or manage your preferences. See our{" "}
                <a href="/legal/cookies" className="underline underline-offset-2 hover:text-blue-500">
                  Cookie Policy
                </a>.
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleReject}
                  className="flex items-center gap-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  <XCircle size={16} /> Reject
                </button>

                <button
                  onClick={handleAccept}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-700 transition"
                >
                  <CheckCircle size={16} /> Accept All
                </button>

                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-700 transition"
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