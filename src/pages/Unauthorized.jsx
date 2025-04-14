import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="text-center px-6 py-12 bg-white dark:bg-gray-800 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-4">
          🚫 Access Denied
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          You don't have permission to access this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}