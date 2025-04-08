import { useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import Loader from "@/components/Loader";
import { selectAllNotes, selectNotesLoading } from "../notesSelectors";

export default function NoteList() {
  const notes = useSelector(selectAllNotes);
  const loading = useSelector(selectNotesLoading);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader message="Loading your notes..." />
      </div>
    );
  }

  if (!notes.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No notes yet. Click "New" to create your first one!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
