import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePanel() {
  const { user } = useAuth();

  const fullName = user?.displayName || "Qatip User";
  const email = user?.email || "unknown@example.com";

  return (
    <div className="space-y-4 text-sm text-gray-800 dark:text-gray-200">
      <div>
        <h3 className="font-medium mb-1">👤 Full Name</h3>
        <p>{fullName}</p>
      </div>

      <div>
        <h3 className="font-medium mb-1">📧 Email</h3>
        <p>{email}</p>
      </div>

      <div>
        <h3 className="font-medium mb-1">🛠️ Account</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Editing will be available soon.
        </p>
      </div>
    </div>
  );
}