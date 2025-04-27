import ReactDOM from "react-dom";
import { CheckCircle, X } from "lucide-react";

export default function EmailVerificationModal({ onClose }) {
  const modalRoot = document.getElementById("modal-root") || document.body;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle size={48} className="text-green-500" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4 dark:text-white">
          Verify Your Email 📩
        </h2>

        <p className="text-center text-gray-700 dark:text-gray-300">
          We have sent a verification link to your email address.
        </p>
        <p className="text-center text-gray-700 dark:text-gray-300 mt-2">
          Please check your inbox and verify your account before logging in.
        </p>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
}