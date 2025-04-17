// 📁 src/features/notifications/NotificationItem.jsx
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils"; // optional tailwind merge helper

export default function NotificationItem({ notification }) {
  const {
    title,
    message,
    createdAt,
    type = "info",
  } = notification;

  return (
    <div
      className={cn(
        "p-4 rounded-md border shadow-sm",
        type === "success" && "border-green-300 bg-green-50 text-green-800",
        type === "error" && "border-red-300 bg-red-50 text-red-800",
        type === "info" && "border-blue-300 bg-blue-50 text-blue-800"
      )}
    >
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">{message}</p>
      <span className="text-[10px] text-gray-400">
        {createdAt?.toDate
          ? formatDistanceToNow(createdAt.toDate(), { addSuffix: true })
          : "Just now"}
      </span>
    </div>
  );
}