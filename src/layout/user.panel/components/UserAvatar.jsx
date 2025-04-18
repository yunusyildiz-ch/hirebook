import { useAuth } from "@/contexts/AuthContext";

export default function UserAvatar({ size = 40 }) {
  const { user } = useAuth();
  const photoURL = user?.photoURL;

  const dimension = `${size}px`;

  return (
    <img
      src={photoURL || "/avatar-placeholder.png"}
      alt="User Avatar"
      className="rounded-full object-cover border border-gray-300 dark:border-gray-600"
      style={{ width: dimension, height: dimension }}
    />
  );
}