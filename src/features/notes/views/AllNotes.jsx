// src/features/notes/views/AllNotes.jsx
import { useSelector } from "react-redux";
import NoteList from "../components/NoteList";
import NoteDetail from "../components/NoteDetail";
import NoteEditor from "../components/NoteEditor";

export default function AllNotes() {
  const viewMode = useSelector((state) => state.notes.viewMode);

  return (
    <div className="p-4">
      {viewMode === "list" && <NoteList />}
      {viewMode === "detail" && <NoteDetail />}
      {viewMode === "edit" && <NoteEditor />}
    </div>
  );
}