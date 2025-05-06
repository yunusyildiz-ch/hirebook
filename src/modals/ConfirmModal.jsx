export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-sm space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onCancel}
              className="px-4 py-1 rounded  border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-1 rounded border border-red-700  bg-redPrimary hover:bg-red-700 text-white transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }