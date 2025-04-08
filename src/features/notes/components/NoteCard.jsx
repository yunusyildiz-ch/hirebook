import { useDispatch } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { setSelectedNote, setViewMode } from "../notesSlice";

export default function NoteCard({ note }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedNote(note));
    dispatch(setViewMode("view"));
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-800"
    >
      <h3 className="font-bold text-lg text-gray-800 dark:text-white truncate mb-2">
        {note.text?.replace(/<[^>]+>/g, "").slice(0, 30) || "Untitled"}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
}