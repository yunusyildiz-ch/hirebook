import { useSelector } from "react-redux";
import AllNotes from "./views/AllNotes";
import NoteDetail from "../notes/components/NoteDetail";
import NoteEditor from "../notes/components/NoteEditor";

export default function NotesPage() {
  const viewMode = useSelector((state) => state.notes.viewMode);

  if (viewMode === "view") {
    return <NoteDetail />;
  }

  if (viewMode === "edit") {
    return <NoteEditor />;
  }

  // Default is list mode
  return <AllNotes />;
}
