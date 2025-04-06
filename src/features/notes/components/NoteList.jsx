import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "../notesThunks";
import { setSelectedNote } from "../notesSlice";
import { useAuth } from "@/contexts/AuthContext";
import NoteCard from "./NoteCard";
import Loader from "@/components/Loader";
import { formatDate } from "@/utils/formatDate";

export default function NoteList() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { notes, loading, error, selectedNote } = useSelector((state) => state.notes);

  useEffect(() => {
    if (user?.uid) {
      dispatch(loadNotes(user.uid));
    }
  }, [user, dispatch]);

  const handleSelect = (note) => {
    dispatch(setSelectedNote(note));
  };

  if (loading) return <Loader message="Loading notes..." />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (notes.length === 0) return <p className="text-gray-500 text-center">No notes yet.</p>;

  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <div
          key={note.id}
          onClick={() => handleSelect(note)}
          className={`cursor-pointer rounded p-3 border dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition ${
            selectedNote?.id === note.id
              ? "bg-blue-100 dark:bg-gray-800 font-semibold"
              : "bg-white dark:bg-gray-900"
          }`}
        >
          <NoteCard note={note} createdAt={formatDate(note.createdAt)} />
        </div>
      ))}
    </div>
  );
}