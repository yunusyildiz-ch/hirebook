import { Loader2 } from "lucide-react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm">
      <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <Loader2 className="animate-spin w-6 h-6 text-gray-600 dark:text-gray-200" />
        <span className="text-gray-700 dark:text-gray-200 font-medium">{message}</span>
      </div>
    </div>
  );
};

export default Loader;