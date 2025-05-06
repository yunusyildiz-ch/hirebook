import { useAuth } from "@/contexts/AuthContext";

export default function UserAvatar({ size = 96 }) {
  const { user } = useAuth();
  const photoURL = user?.photoURL || "/cat_logo.png";
  const dimension = `${size}px`;

  return (
    <img
      src={photoURL}
      alt="User Avatar"
      className="rounded-full object-cover border border-gray-300 dark:border-gray-600"
      style={{ width: dimension, height: dimension }}
    />
  );
}