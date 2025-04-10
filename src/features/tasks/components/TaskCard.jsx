import { useDispatch } from "react-redux";
import { Pencil, Trash2, Archive } from "lucide-react";
import { format } from "date-fns";
import {
  setSelectedTask,
  setViewMode,
} from "../tasksUI.slice";

const statusColors = {
  "To-do": "bg-yellow-100 text-yellow-800 dark:bg-yellow-200/20 dark:text-yellow-400",
  "In Progress": "bg-blue-100 text-blue-800 dark:bg-blue-200/20 dark:text-blue-400",
  "In Review": "bg-purple-100 text-purple-800 dark:bg-purple-200/20 dark:text-purple-400",
  "Done": "bg-green-100 text-green-800 dark:bg-green-200/20 dark:text-green-400",
  "Archived": "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white",
};

export default function TaskCard({ task, onDelete }) {
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(setSelectedTask(task));
    dispatch(setViewMode("view"));
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(setSelectedTask(task));
    dispatch(setViewMode("edit"));
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete(task);
  };

  const handleArchive = (e) => {
    e.stopPropagation();

    const updatedTask = {
      ...task,
      status: "Archived",
    };

    dispatch(updateTask(updatedTask)); 
  };

  return (
    <div
      onClick={handleView}
      className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition space-y-3 cursor-pointer group"
    >
      {/* Top-right action buttons (visible on hover) */}
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition z-10">
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
          <Trash2 size={16} className="text-red-500" />
        </button>
        <button
          onClick={handleArchive}
          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <Archive size={16} />
        </button>
      </div>

      {/* Task title and project name */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {task.title || "Untitled Task"}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {task.project || "—"}
        </p>
      </div>

      {/* Status label */}
      <div>
        <span
          className={`inline-block text-xs px-2 py-1 rounded ${statusColors[task.status]}`}
        >
          {task.status}
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {task.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-0.5 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Created:{" "}
        {task.createdAt
          ? format(new Date(task.createdAt), "PPPp")
          : "N/A"}
      </div>
    </div>
  );
}