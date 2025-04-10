import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import ConfirmModal from "@/components/modals/ConfirmModal";
import { deleteTaskThunk } from "../tasksThunks";
import {
  clearSelectedTask,
  setViewMode,
} from "../tasksUI.slice";
import { selectSelectedTask } from "../tasksSelectors";

export default function TaskDetail() {
  const dispatch = useDispatch();
  const task = useSelector(selectSelectedTask);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEdit = () => {
    dispatch(setViewMode("edit"));
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (!task) return;
    dispatch(deleteTaskThunk(task.id));
    dispatch(clearSelectedTask());
    dispatch(setViewMode("list"));
    setShowConfirm(false);
  };

  const cancelDelete = () => setShowConfirm(false);

  const handleBack = () => {
    dispatch(clearSelectedTask());
    dispatch(setViewMode("list"));
  };

  if (!task) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No task selected.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {task.title || "Untitled"}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300">{task.description}</p>

      <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
        <div>
          <strong>Status:</strong>{" "}
          <span className="inline-block px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
            {task.status}
          </span>
        </div>
        <div>
          <strong>Project:</strong> {task.project || "—"}
        </div>
        <div>
          <strong>Created:</strong>{" "}
          {format(new Date(task.createdAt), "PPPp")}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {task.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-0.5 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="pt-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft size={16} /> Back to tasks
        </button>
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}