import { useDispatch } from "react-redux";
import {
  setSelectedCandidate,
  setViewMode,
} from "../candidatesUI.slice";
import { Pencil, Trash2 } from "lucide-react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-200/20 dark:text-yellow-400",
  Interviewed: "bg-blue-100 text-blue-800 dark:bg-blue-200/20 dark:text-blue-400",
  Rejected: "bg-red-100 text-red-800 dark:bg-red-200/20 dark:text-red-400",
};

export default function CandidateCard({ candidate, onDelete }) {
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(setSelectedCandidate(candidate));
    dispatch(setViewMode("view"));
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(setSelectedCandidate(candidate));
    dispatch(setViewMode("edit"));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(candidate);
  };

  return (
    <div
      onClick={handleView}
      className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition space-y-3 cursor-pointer group"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {candidate.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {candidate.position}
          </p>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={handleEdit}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <span
        className={`text-xs px-2 py-1 rounded ${statusColors[candidate.status]}`}
      >
        {candidate.status}
      </span>

      <div className="flex flex-wrap gap-2">
        {candidate.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}