// src/pages/Dashboard.jsx
import NoteList from "../features/notes/components/NoteList";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <NoteList />
    </div>
  );
}