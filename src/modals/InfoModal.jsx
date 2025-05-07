import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";

export default function InfoModal({ isOpen, title, message, icon, onClose }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full shadow-xl space-y-4 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          {icon && <div className="text-blue-500">{icon}</div>}
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {message}
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}