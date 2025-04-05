import { useEffect, useState } from "react";
import { addNote, subscribeToNotes } from "../services/noteService";
import { useAuth } from "../contexts/AuthContext";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const unsubscribe = subscribeToNotes(setNotes);
    return () => unsubscribe?.();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      await addNote(newNote.trim());
      setNewNote("");
    } catch (error) {
      console.error("Note save error:", error);
      toast.error("Failed to save note.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Write a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <button className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Save
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li
              key={note.id}
              className="p-3 bg-gray-100 rounded dark:bg-gray-800 dark:text-white"
            >
              <p className="mb-1">{note.text}</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {note.createdAt
                  ? note.createdAt.toDate().toLocaleString()
                  : "Just now"}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
