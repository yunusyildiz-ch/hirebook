import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComingSoonModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl max-w-sm w-full p-6 text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:hover:text-white"
              onClick={onClose}
            >
              <X size={20} />
            </button>
            <div className="text-5xl mb-4">🚧</div>
            <h2 className="text-xl font-semibold mb-2">Coming Soon!</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              This feature is under construction. We’re working hard to bring it
              to you soon!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}