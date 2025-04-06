// NoteCard.jsx
import { Edit2, Trash2 } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { useDispatch } from "react-redux";
import { setSelectedNote, setViewMode } from "../notesSlice";

export default function NoteCard({ note }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedNote(note));
    dispatch(setViewMode("detail")); //NoteDetail 
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-start cursor-pointer"
    >
      <div>
        <p className="text-sm dark:text-white">{note.text}</p>
        <span className="text-xs text-gray-400">{formatDate(note.createdAt)}</span>
      </div>
      <div className="flex gap-2">
        <button
          className="text-yellow-600 hover:text-yellow-800"
          onClick={(e) => {
            e.stopPropagation(); // prevent click the card
            dispatch(setSelectedNote(note));
            dispatch(setViewMode("edit"));
          }}
        >
          <Edit2 size={16} />
        </button>
        <button
          className="text-red-600 hover:text-red-800"
          onClick={(e) => {
            e.stopPropagation(); // 👈 
            if (window.confirm("Are you sure you want to delete this note?")) {
              dispatch(deleteNote(note.id));
            }
          }}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}