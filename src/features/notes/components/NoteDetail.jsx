import { useSelector, useDispatch } from "react-redux";
import { formatDate } from "@/utils/formatDate";
import { setViewMode, clearSelectedNote } from "../notesSlice";
import { deleteNoteThunk } from "../notesThunks";
import { Pencil, Trash2 } from "lucide-react";

export default function NoteDetail() {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state) => state.notes.selectedNote);

  if (!selectedNote) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center mt-8">
        Select a note to view details
      </div>
    );
  }

  const handleEdit = () => {
    dispatch(setViewMode("edit"));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteThunk(selectedNote.id));
      dispatch(clearSelectedNote());
      dispatch(setViewMode("list"));
    }
  };

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Note Detail</h2>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="text-sm text-yellow-600 hover:text-yellow-800 flex items-center gap-1"
          >
            <Pencil size={16} />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <p className="text-lg mb-4 dark:text-white whitespace-pre-line">
        {selectedNote.text}
      </p>

      <div className="text-sm text-gray-500 space-y-1">
        <p>Created: {formatDate(selectedNote.createdAt)}</p>
        {selectedNote.updatedAt && (
          <p>Updated: {formatDate(selectedNote.updatedAt)}</p>
        )}
      </div>
    </div>
  );
}