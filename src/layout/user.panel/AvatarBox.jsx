import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AvatarBox() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const avatarUrl = user?.photoURL;
  const userInitial = user?.displayName?.charAt(0)?.toUpperCase() || "?";
  const userFullName = user?.displayName || "Qatip User";
  const userEmail = user?.email || "unknown@example.com";
  const isGoogleUser = user?.providerData?.[0]?.providerId === "google.com";

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div className="relative group" ref={dropdownRef}>
      {/* Avatar */}
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="User Avatar"
          onClick={toggleDropdown}
          className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700 cursor-pointer hover:scale-105 transition"
        />
      ) : (
        <div
          onClick={toggleDropdown}
          className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold hover:scale-105 transition cursor-pointer"
        >
          {userInitial}
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-md z-50 text-sm border dark:border-gray-700">
          <div className="px-4 py-3 border-b dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
            <p className="font-medium text-gray-800 dark:text-white truncate">{userFullName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userEmail}</p>
          </div>
          <ul className="divide-y dark:divide-gray-700">
            {isGoogleUser && (
              <li>
                <button
                  onClick={() =>
                    window.open("https://myaccount.google.com", "_blank")
                  }
                  className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <User size={16} />
                  Manage Google Account
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => alert("Profile Edit modal açılacak")}
                className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <Settings size={16} />
                Edit Profile
              </button>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
              >
                <LogOut size={16} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}