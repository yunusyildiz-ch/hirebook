import { useEffect, useRef } from "react";

export default function NotificationPanel({ onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="fixed right-20 top-20 w-80 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-xl rounded-xl p-4 z-50 border dark:border-gray-700"
    >
      <h3 className="text-lg font-semibold mb-3">Notifications</h3>
      <ul className="space-y-2 text-sm">
        <li className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          🔔 Your profile was viewed 3 times today
        </li>
        <li className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          📌 You have a task due tomorrow
        </li>
        <li className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
          ✅ Candidate screening completed
        </li>
      </ul>
    </div>
  );
}