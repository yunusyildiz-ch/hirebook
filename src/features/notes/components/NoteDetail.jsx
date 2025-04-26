import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import ConfirmModal from "@modals/ConfirmModal";
import { deleteNoteThunk } from "../notesThunks";
import { clearSelectedNote } from "../notesSlice";
import { setViewMode, setActiveTab } from "../notesUI.slice";
import { selectSelectedNote } from "../notesSelectors";

export default function NoteDetail() {
  const dispatch = useDispatch();
  const note = useSelector(selectSelectedNote);
  const [showConfirm, setShowConfirm] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    content: note?.text || "",
  });

  const handleEdit = () => {
    dispatch(setViewMode("edit"));
  };

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!note) return;
    await dispatch(deleteNoteThunk(note.id));
    dispatch(clearSelectedNote());
    dispatch(setViewMode("list"));
    dispatch(setActiveTab("All"));
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const handleBack = () => {
    dispatch(clearSelectedNote());
    dispatch(setViewMode("list"));
    dispatch(setActiveTab("All"));
  };

  if (!note || !editor) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No note selected.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white break-words">
          {note.title?.trim() || "Untitled"}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Edit Note"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Delete Note"
          >
            <Trash2 size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Editor content */}
      <EditorContent
        editor={editor}
        className="w-full focus:outline-none px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-inner cursor-default prose dark:prose-invert max-w-none"
      />

      {/* Metadata */}
      <div className="text-sm text-gray-500 dark:text-gray-400 flex justify-between items-center">
        <span>
          Created:{" "}
          {note.createdAt
            ? new Date(note.createdAt).toLocaleString()
            : "N/A"}
        </span>
        {note.updatedAt && (
          <span>
            Updated: {new Date(note.updatedAt).toLocaleString()}
          </span>
        )}
      </div>

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={16} /> Back to notes
      </button>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}