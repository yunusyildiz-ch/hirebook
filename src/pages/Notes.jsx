import { useEffect, useState } from "react";
import { addNote, updateNote, deleteNote, subscribeToNotes } from "../services/noteService";
import { useAuth } from "../contexts/AuthContext";
import NoteCard from "../components/NoteCard";
import { toast } from "react-hot-toast";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uid) return;
    const unsubscribe = subscribeToNotes(user.uid, setNotes);
    return () => unsubscribe?.();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      if (editingNote) {
        await updateNote(editingNote.id, newNote.trim());
        toast.success("Note updated 📝");
      } else {
        await addNote(newNote.trim());
        toast.success("Note added ✨");
      }
      setNewNote("");
      setEditingNote(null);
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  };

  const handleEdit = (note) => {
    setNewNote(note.text);
    setEditingNote(note);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      toast.success("Note deleted 🗑️");
    } catch (error) {
      toast.error("Delete failed.");
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
        <button
          type="submit"
          className={`px-4 rounded text-white transition ${
            editingNote ? "bg-yellow-600 hover:bg-yellow-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingNote ? "Update" : "Save"}
        </button>
      </form>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id}>
              <NoteCard note={note} onEdit={handleEdit} onDelete={handleDelete} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}