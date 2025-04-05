import { Loader2 } from "lucide-react";

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
      <Loader2 className="animate-spin w-8 h-8 text-gray-600 dark:text-gray-200" />
      <span className="ml-2 text-gray-700 dark:text-gray-200 text-lg font-medium">
        {message}
      </span>
    </div>
  );
};

export default Loader;