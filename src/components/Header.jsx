import { useAuth } from "../contexts/AuthContext";
import { LogOut, User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">HiRebook</h1>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user && (
          <>
            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200 text-sm">
              <User2 size={18} />
              <span>{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;