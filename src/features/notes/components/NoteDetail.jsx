import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import { Pencil, Trash2, ArrowLeft } from "lucide-react";
import { deleteNoteThunk } from "../notesThunks";
import { setViewMode, clearSelectedNote } from "../notesSlice";
import toast from "react-hot-toast";

export default function NoteDetail() {
  const dispatch = useDispatch();
  const note = useSelector((state) => state.notes.selectedNote);

  const handleEdit = () => {
    dispatch(setViewMode("edit"));
  };

  const handleDelete = () => {
    if (!note) return;
    dispatch(deleteNoteThunk(note.id));
    toast.success("Note deleted");
    dispatch(setViewMode("list"));
    dispatch(clearSelectedNote());
  };

  const handleBack = () => {
    dispatch(setViewMode("list"));
    dispatch(clearSelectedNote());
  };

  if (!note) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No note selected.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Note Detail
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            <Trash2 size={18} />
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
          <span>
            Updated: {format(new Date(note.updatedAt), "PPPp")}
          </span>
        )}
      </div>

      <button
        onClick={handleBack}
        className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
      >
        <ArrowLeft size={16} /> Back to notes
      </button>
    </div>
  );
}