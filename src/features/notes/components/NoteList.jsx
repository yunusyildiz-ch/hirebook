import { useSelector } from "react-redux";
import NoteCard from "./NoteCard";
import Loader from "@/components/Loader";
import {
  selectAllNotes,
  selectActiveTab,
  selectSearchTerm,
  selectNotesLoading,
} from "../notesSelectors";

export default function NoteList({ onDelete }) {
  const notes = useSelector(selectAllNotes);
  const activeTab = useSelector(selectActiveTab);
  const searchTerm = useSelector(selectSearchTerm);
  const loading = useSelector(selectNotesLoading);

  const filteredNotes = notes.filter((note) => {
    const matchesTab = activeTab === "All" || note.folderId === activeTab;
    const matchesSearch = note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.text?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader message="Loading your notes..." />
      </div>
    );
  }

  if (!filteredNotes.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No notes found.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredNotes.map((note) => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
}
