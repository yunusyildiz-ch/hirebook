import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPanel({ onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
      <div
        ref={panelRef}
        className="w-80 bg-white dark:bg-gray-900 h-full shadow-lg p-6 flex flex-col justify-between border-l border-gray-200 dark:border-gray-700"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold dark:text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300 hover:text-red-500">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-gray-800 dark:text-gray-200">
          <div>
            <h3 className="font-medium mb-1">🌓 Theme</h3>
            <ThemeToggle />
          </div>

          <div>
            <h3 className="font-medium mb-1">🌐 Language</h3>
            <select className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="tr">Türkçe</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium mb-1">👤 Profile</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Profile editing coming soon...</p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 text-center text-xs text-gray-400 dark:text-gray-500">
          Qatip App – v1.0.0
        </div>
      </div>
    </div>
  );
}