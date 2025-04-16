import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { deleteNoteThunk } from "../notesThunks";
import { clearSelectedNote } from "../notesSlice";
import { setViewMode } from "../notesUI.slice";
import { selectSelectedNote } from "../notesSelectors";
import ConfirmModal from "@modals/ConfirmModal";

export default function NoteDetail() {
  const dispatch = useDispatch();
  const note = useSelector(selectSelectedNote);
  const [showConfirm, setShowConfirm] = useState(false); // 🔹 Modal kontrolü

  const handleEdit = () => {
    dispatch(setViewMode("edit"));
  };

  const handleDelete = () => {
    setShowConfirm(true); // 🔹 Modal'ı aç
  };

  const confirmDelete = () => {
    dispatch(deleteNoteThunk(note.id));
    dispatch(clearSelectedNote());
    dispatch(setViewMode("list"));
    setShowConfirm(false); // 🔹 Modal'ı kapat
  };

  const cancelDelete = () => {
    setShowConfirm(false); // 🔹 Modal'ı kapat
  };

  const handleBack = () => {
    dispatch(clearSelectedNote());
    dispatch(setViewMode("list"));
  };

  if (!note) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No note selected.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4 relative">
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {note.title?.trim() || "Untitled"}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-md hover:bg-gray-100 hover:text-blue-700 transition dark:hover:bg-gray-700"
            title="Edit Note"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-md hover:bg-gray-100 hover:text-red-700 transition dark:hover:bg-gray-700"
            title="Delete Note"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: note.text }} />
      </div>

      <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
        <span>
          Created:{" "}
          {note.createdAt ? format(new Date(note.createdAt), "PPPp") : "N/A"}
        </span>
        {note.updatedAt && (
          <span>Updated: {format(new Date(note.updatedAt), "PPPp")}</span>
        )}
      </div>

      <button
        onClick={handleBack}
        className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={16} /> Back to notes
      </button>

      {/* ✅ Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Note"
        message="Are you sure you want to permanently delete this note? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
