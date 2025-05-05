import { useState } from "react";
import CookieModal from "@modals/CookieModal";
import ThemeSelector from "@components/ThemeSelector";

export default function SettingsPanel() {
  const [showCookieModal, setShowCookieModal] = useState(false);

  return (
    <div className="space-y-6 text-sm text-gray-800 dark:text-gray-200">
      {/* Theme */}
      <div>
        <h3 className="font-medium mb-1">🌓 Theme</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Default appearance follows your device settings. You can manually switch between light and dark mode below.
        </p>
        <ThemeSelector />
      </div>

      {/* Language */}
      <div>
        <h3 className="font-medium mb-1">🌐 Language</h3>
        <select className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:border-transparent focus:ring-primary transition">
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="tr">Türkçe</option>
        </select>
      </div>

      {/* Cookie Preferences */}
      <div>
        <h3 className="font-medium mb-1">🍪 Cookie Preferences</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          You can review and update how we use cookies to enhance your experience.
        </p>
        <button
          onClick={() => setShowCookieModal(true)}
          className="text-sm px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Manage Preferences
        </button>
      </div>

      {showCookieModal && (
        <CookieModal onClose={() => setShowCookieModal(false)} />
      )}
    </div>
  );
}
