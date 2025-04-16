import React, { useState } from "react";
import { useCookieConsent } from "../hooks/useCookieConsent";
import { X } from "lucide-react";

export default function CookieModal({ onClose }) {
  const { updatePreferences } = useCookieConsent();

  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [functionality, setFunctionality] = useState(true);
  const [social, setSocial] = useState(false);

  const handleSave = () => {
    updatePreferences({
      necessary: true,
      analytics,
      marketing,
      functionality,
      social,
    });
    onClose();
  };

  const Toggle = ({ enabled, setEnabled }) => (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
        enabled ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-2xl shadow-2xl w-full max-w-lg p-6 sm:p-8 transition-all space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold">Manage Cookie Preferences</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize how <span className="italic font-bold ">Qatip.App</span>{" "}
          uses cookies to enhance your experience.
          <span className="block mt-1">
            <strong>Note:</strong> Essential cookies are always active for app
            functionality.
          </span>
        </p>

        <div className="space-y-5">
          {/* Analytics */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-medium">Analytics Cookies</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Help us understand how users interact with Qatip to improve
                performance.
              </p>
            </div>
            <Toggle enabled={analytics} setEnabled={setAnalytics} />
          </div>

          {/* Marketing */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-medium">Marketing Cookies</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Used to show personalized ads and measure advertising
                effectiveness.
              </p>
            </div>
            <Toggle enabled={marketing} setEnabled={setMarketing} />
          </div>

          {/* Functionality */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-medium">Functionality Cookies</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Remember your settings and preferences like language or theme.
              </p>
            </div>
            <Toggle enabled={functionality} setEnabled={setFunctionality} />
          </div>

          {/* Social Media */}
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-medium">Social Media Cookies</span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enable sharing features and track engagement across social
                platforms.
              </p>
            </div>
            <Toggle enabled={social} setEnabled={setSocial} />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-6 w-full">
          <button
            onClick={onClose}
            className="text-sm px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
