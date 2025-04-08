// src/features/candidates/components/CandidateDetail.jsx

import { useDispatch } from "react-redux";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { setViewMode, clearSelectedCandidate } from "../candidatesUI.slice";
import { format } from "date-fns";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200/20 dark:text-yellow-400",
  Interviewed: "bg-blue-100 text-blue-800 dark:bg-blue-200/20 dark:text-blue-400",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-200/20 dark:text-red-400",
};

export default function CandidateDetail({ candidate, onDelete }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setViewMode("edit"));
  };

  const handleBack = () => {
    dispatch(clearSelectedCandidate());
    dispatch(setViewMode("list"));
  };

  const handleDelete = () => {
    onDelete(candidate);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {candidate.name}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300">{candidate.position}</p>
      <span
        className={`inline-block text-xs px-2 py-1 rounded font-medium ${statusColors[candidate.status]}`}
      >
        {candidate.status}
      </span>

      <div className="flex flex-wrap gap-2 mt-2">
        {candidate.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {candidate.createdAt && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Created: {format(new Date(candidate.createdAt), "PPPp")}
        </p>
      )}

      <button
        onClick={handleBack}
        className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={16} /> Back to candidates
      </button>
    </div>
  );
}