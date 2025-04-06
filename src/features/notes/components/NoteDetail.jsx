// src/features/notes/components/NoteDetail.jsx

import { useSelector } from "react-redux";

export default function NoteDetail() {
  const { notes, selectedNoteId } = useSelector((state) => state.notes);

  const note = notes.find((n) => n.id === selectedNoteId);

  if (!note) {
    return (
      <div className="text-gray-500 dark:text-gray-400 text-center mt-8">
        Select a note to view details
      </div>
    );
  }

  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow h-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Note Detail</h2>

      <p className="text-lg mb-4 dark:text-white whitespace-pre-line">
        {note.text}
      </p>

      <div className="text-sm text-gray-500 space-y-1">
        <p>Created: {note.createdAt?.toDate().toLocaleString() || "Unknown"}</p>
        {note.updatedAt && (
          <p>Updated: {note.updatedAt.toDate().toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}