import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNoteThunk, updateNoteThunk } from "../notesThunks";
import { selectSelectedNote } from "../notesSelectors";
import { clearSelectedNote } from "../notesSlice";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const selectedNote = useSelector(selectSelectedNote);
  const [text, setText] = useState("");

  // Pre-fill text input when a note is selected
  useEffect(() => {
    setText(selectedNote?.text || "");
  }, [selectedNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    if (selectedNote) {
      dispatch(updateNoteThunk({ id: selectedNote.id, text: trimmed }));
    } else {
      dispatch(addNoteThunk(trimmed));
    }

    dispatch(clearSelectedNote());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Write a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <button
        type="submit"
        className={`px-4 rounded text-white transition ${
          selectedNote
            ? "bg-yellow-600 hover:bg-yellow-700"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {selectedNote ? "Update" : "Save"}
      </button>
    </form>
  );
}