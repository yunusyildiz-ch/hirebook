import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/services/firebase/config";
import { useNavigate } from "react-router-dom";

export default function NotificationItem({ notification }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const {
    id,
    title,
    message,
    createdAt,
    type = "info",
    readBy = [],
    icon = "bell",
    priority = "normal",
    actionText = "View",
    url = "#",
    isHtml = false,
  } = notification;

  const isRead = readBy.includes(user?.uid);
  const isClickable = !!url && url !== "#";

  const handleToggleExpand = async () => {
    if (!isRead && user?.uid) {
      try {
        const notifRef = doc(db, "notifications", id);
        await updateDoc(notifRef, {
          readBy: arrayUnion(user.uid),
        });
      } catch (err) {
        console.error("Mark as read failed:", err);
      }
    }
    setExpanded((prev) => !prev);
  };

  const handleDismiss = async () => {
    if (!notification.dismissedBy?.includes(user.uid)) {
      try {
        const notifRef = doc(db, "notifications", id);
        await updateDoc(notifRef, {
          dismissedBy: arrayUnion(user.uid),
        });
        setDismissed(true);
      } catch (err) {
        console.error("Dismiss failed:", err);
      }
    } else {
      setDismissed(true);
    }
  };

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "p-4 rounded-xl border relative transition-all group overflow-hidden hover:shadow-sm",
        {
          // 🎨 Type-based background
          "border-green-300 bg-green-50 dark:bg-[#0f2f1a] text-green-800 dark:text-green-100": type === "success",
          "border-red-300 bg-red-50 dark:bg-[#331010] text-red-800 dark:text-red-100": type === "error",
          "border-blue-300 bg-blue-50 dark:bg-[#0f2539] text-blue-800 dark:text-blue-100": type === "info",

          // 🔔 Priority highlight
          "ring-2 ring-red-500": priority === "high",

          // ✅ Unread styling
          "ring-2 ring-yellow-400 font-semibold hover:bg-yellow-100 dark:hover:bg-[#3a3000]":
            !isRead,

          // ✅ Read styling
          "opacity-70 hover:opacity-100": isRead,
        }
      )}
      onClick={handleToggleExpand}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDismiss();
        }}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>

      <h4 className="font-semibold text-sm mb-1 flex items-center gap-1">
        {title}
        {priority === "high" && (
          <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-200 text-red-800 dark:bg-red-800 dark:text-white rounded">
            HIGH
          </span>
        )}
        {!isRead && (
          <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-yellow-400 text-black rounded uppercase">
            NEW
          </span>
        )}
      </h4>

      {expanded && (
        isHtml ? (
          <div
            className="text-gray-700 dark:text-gray-200 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ) : (
          <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
            {message}
          </p>
        )
      )}

      <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 mt-1">
        <span>
          {createdAt?.toDate
            ? formatDistanceToNow(createdAt.toDate(), { addSuffix: true })
            : "Just now"}
        </span>

        {url && url !== "#" && (
          <span className="text-blue-600 text-xs font-medium flex items-center gap-1 group-hover:underline">
            {actionText} <ArrowRight size={12} />
          </span>
        )}
      </div>
    </div>
  );
}

