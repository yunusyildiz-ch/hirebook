// src/components/settings/ThemeSelector.jsx
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <select
      value={theme}
      onChange={handleChange}
      className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-skyBorder transition"
    >
      <option value="system">System Default</option>
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
    </select>
  );
}