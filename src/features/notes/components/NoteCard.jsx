import { Edit2, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

export default function NoteCard({ note }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-start">
      <div>
        <p className="text-sm dark:text-white">{note.text}</p>
        <span className="text-xs text-gray-400">
          {formatDate(note.createdAt)}
        </span>
      </div>
      <div className="flex gap-2">
        <button className="text-yellow-600 hover:text-yellow-800">
          <Edit2 size={16} />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}