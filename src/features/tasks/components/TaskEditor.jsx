import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearSelectedTask,
  setViewMode,
} from "../tasksUI.slice";
import { showSuccess, showError } from "@/utils/toastUtils";
import { Save, Plus, X } from "lucide-react";

const statusOptions = [
  "To-do",
  "In Progress",
  "In Review",
  "Done",
  "Archived",
];

export default function TaskEditor({ task, onSave }) {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To-do");
  const [project, setProject] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "To-do");
      setProject(task.project || "");
      setTags(task.tags || []);
    } else {
      setTitle("");
      setDescription("");
      setStatus("To-do");
      setProject("");
      setTags([]);
    }
  }, [task]);

  const handleAddTag = () => {
    const trimmed = newTag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      showError("Title is required.");
      return;
    }

    const taskData = {
      id: task?.id || `t${Date.now()}`,
      title,
      description,
      status,
      tags,
      project,
      createdAt: task?.createdAt || new Date().toISOString(),
    };

    onSave(taskData);
    showSuccess(task ? "Task updated" : "Task added");
    dispatch(clearSelectedTask());
    dispatch(setViewMode("list"));
  };

  const handleCancel = () => {
    dispatch(clearSelectedTask());
    dispatch(setViewMode("list"));
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {task ? "Edit Task" : "New Task"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Project"
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        value={project}
        onChange={(e) => setProject(e.target.value)}
      />

      <select
        className="w-full p-2 rounded border dark:bg-gray-700 dark:text-white"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statusOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <div className="flex gap-2 mt-1 mb-2">
          <input
            type="text"
            placeholder="Add tag..."
            className="flex-1 p-2 rounded border dark:bg-gray-700 dark:text-white"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-0.5 rounded-full text-sm flex items-center gap-1"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          <Save size={16} className="inline mr-1" />
          Save
        </button>
      </div>
    </div>
  );
}
