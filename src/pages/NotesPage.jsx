import NoteList from "@/features/notes/components/NoteList";
import NoteDetail from "@/features/notes/components/NoteDetail";
import NoteEditor from "@/features/notes/components/NoteEditor";

export default function NotesPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Liste */}
      <div className="col-span-1">
        <NoteEditor />
      </div>

      {/* Detay */}
      <div className="col-span-2">
        <NoteDetail />
      </div>
    </div>
  );
}
