import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { X, MailCheck } from "lucide-react";
import QatipCatLogo from "@/assets/QatipCatLogo";

export default function ResetPasswordNoticeModal({ isOpen, email, onClose }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl max-w-md w-full relative text-center">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        <QatipCatLogo className="w-16 h-16 mx-auto text-gray-800 dark:text-white mb-4" />
        <MailCheck className="w-12 h-12 text-green-600 mx-auto mb-2" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Check Your Email 📩
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          A password reset link has been sent to:
        </p>
        <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-4">{email}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Please click the link to create a new password.<br />
          You can close this window after resetting.
        </p>
      </div>
    </div>,
    document.body
  );
}