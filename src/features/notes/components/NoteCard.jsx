import { useDispatch } from "react-redux";
import { Pencil, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { setSelectedNote, clearSelectedNote } from "../notesSlice";
import { setViewMode, setActiveTab } from "../notesUI.slice";
import { deleteNoteThunk } from "../notesThunks";

export default function NoteCard({ note }) {
  const dispatch = useDispatch();

  const handleView = () => {
    dispatch(setSelectedNote(note));
    dispatch(setViewMode("view"));
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(setSelectedNote(note));
    dispatch(setViewMode("edit"));
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await dispatch(deleteNoteThunk(note.id));
    dispatch(clearSelectedNote());
    dispatch(setActiveTab("All"));
    dispatch(setViewMode("list"));
  };

  return (
    <div
      onClick={handleView}
      className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md hover:shadow-lg transition space-y-3 cursor-pointer group"
    >
      {/* Hover Action Buttons */}
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
      </div>

      {/* Note Title */}
      <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate">
        {note.title?.trim() || note.text?.replace(/<[^>]+>/g, "").slice(0, 30) || "Untitled"}
      </h3>

      {/* Created Time */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
}