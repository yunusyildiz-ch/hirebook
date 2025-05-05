import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedCandidate, setViewMode } from "../candidatesUI.slice";
import { selectPreviousViewMode } from "../candidatesSelectors";
import { Plus, Save, X } from "lucide-react";
import { showSuccess, showError } from "@/utils/toastUtils";

export default function CandidateEditor({ candidate = null, onSave }) {
  const dispatch = useDispatch();
  const previousViewMode = useSelector(selectPreviousViewMode);
  const isEdit = Boolean(candidate);

  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("Pending");
  const [tags, setTags] = useState("");
  const [tagList, setTagList] = useState([]);

  const borderStatus = {
    pending: "border-yellow-500 focus:ring-yellow-500",
    interviewed: "border-blue-500 focus:ring-blue-500",
    rejected: "border-red-500 focus:ring-red-500",
  }[status.toLowerCase()];

  useEffect(() => {
    if (candidate) {
      setName(candidate.name || "");
      setPosition(candidate.position || "");
      setStatus(candidate.status || "Pending");
      setTagList(candidate.tags || []);
    }
  }, [candidate]);

  const handleAddTag = () => {
    const tag = tags.trim().toLowerCase();
    if (tag && !tagList.includes(tag)) {
      setTagList([...tagList, tag]);
    }
    setTags("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTagList(tagList.filter((t) => t !== tagToRemove));
  };

  const handleSave = () => {
    const trimmedName = name.trim();
  
    if (!trimmedName) {
      showError("Candidate's name is required.");
      return;
    }
  
    const baseCandidate = {
      name: trimmedName,
      position: position.trim(),
      status,
      tags: tagList,
    };
  
    if (candidate?.id) {
      onSave({ id: candidate.id, ...baseCandidate });
    } else {
      onSave(baseCandidate);
    }
  
    if (previousViewMode === "view") {
      dispatch(setViewMode("view"));
    } else {
      dispatch(clearSelectedCandidate());
      dispatch(setViewMode("list"));
    }
  };

  const handleCancel = () => {
    if (previousViewMode === "view") {
      dispatch(setViewMode("view"));
    } else {
      dispatch(clearSelectedCandidate());
      dispatch(setViewMode("list"));
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {isEdit ? "Edit Candidate" : "New Candidate"}
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-transparent focus:ring-1 transition"
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-transparent focus:ring-1 transition"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className = {` w-full p-2 border rounded dark:bg-gray-700 dark:text-white ${borderStatus} focus:outline-none focus:border-transparent focus:ring-1 transition`}
        >
          <option value="Pending">Pending</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add tag"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-primary focus:border-transparent focus:ring-1 transition"
          />
          <button
            onClick={handleAddTag}
            className="px-3 py-2 rounded text-white bg-skyBlue border border-skyBorder hover:bg-skyBorder hover:border-skyBlue transition"
          >
            <Plus size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tagList.map((tag, i) => (
            <span
              key={i}
              className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-0.5 rounded-full flex items-center gap-1"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="text-xs text-red-500 hover:text-red-700"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-500  hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm bg-skyBlue border border-skyBorder hover:bg-skyBorder hover:border-skyBlue text-white  transition"
        >
          <Save size={16} className="inline mr-1" />
          Save
        </button>
      </div>
    </div>
  );
}