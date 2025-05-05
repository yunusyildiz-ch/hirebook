import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [resolvedTheme, setResolvedTheme] = useState("light");

  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");

      const listener = (e) => {
        setResolvedTheme(e.matches ? "dark" : "light");
      };

      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", listener);
      return () => window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", listener);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const handleToggle = () => {
    // Toggle light/dark manually — system fails:)
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={handleToggle}
      className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 transition duration-300"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "light" ? (
        <Moon size={22} className="text-gray-800" />
      ) : (
        <Sun size={22} className="text-yellow-300" />
      )}
    </button>
  );
};

export default ThemeToggle;