import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 transition duration-300"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon size={22} className="text-gray-800" />
      ) : (
        <Sun size={22} className="text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;