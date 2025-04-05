import { useAuth } from "../contexts/AuthContext";
import { User2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">HiReBOOK</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200 text-sm">
            <User2 size={18} />
            <span>{user.email}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;