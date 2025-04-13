// 📁 src/layout/user.panel/AvatarBox.jsx
import { useAuth } from "@/contexts/AuthContext";

export default function AvatarBox() {
  const { user } = useAuth();

  const avatarUrl = user?.photoURL;
  const userInitial = user?.displayName?.charAt(0)?.toUpperCase() || "?";
  const userFullName = user?.displayName || "Qatip User";
  const userEmail = user?.email || "unknown@example.com";

  return (
    <div className="group relative">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
        />
      ) : (
        <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-semibold hover:scale-105 transition cursor-pointer">
          {userInitial}
        </div>
      )}

      <div className="absolute right-full mr-2 top-1/5 -translate-y-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-md rounded-md px-4 py-3 w-56 opacity-0 group-hover:opacity-100 transition z-50 text-sm">
        <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">
          Qatip Account:
        </p>
        <p className="font-medium truncate">{userFullName}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {userEmail}
        </p>
      </div>
    </div>
  );
}