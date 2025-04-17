import ThemeToggle from "@/components/ThemeToggle";

export default function SettingsPanel() {
  return (
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
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Profile editing will be here soon.
        </p>
      </div>
    </div>
  );
}
