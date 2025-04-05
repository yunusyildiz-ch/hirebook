// components/NoteCard.jsx
import { Pencil, Trash2 } from "lucide-react";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex justify-between items-start gap-4">
      <div>
        <p className="mb-1 text-gray-800 dark:text-white">{note.text}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {note.createdAt ? note.createdAt.toDate().toLocaleString() : "Just now"}
        </p>
      </div>

      <div className="flex gap-2 text-gray-500 dark:text-gray-300">
        <button onClick={() => onEdit(note)}>
          <Pencil size={16} className="hover:text-blue-500" />
        </button>
        <button onClick={() => onDelete(note.id)}>
          <Trash2 size={16} className="hover:text-red-500" />
        </button>
      </div>
    </div>
  );
}