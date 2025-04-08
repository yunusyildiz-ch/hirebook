import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoteList from "../features/notes/components/NoteList";
import { loadNotes } from "../features/notes/notesThunks";
import { useAuth } from "@/contexts/AuthContext";
import FolderView from "../features/notes/views/FolderView";
import NoteEditor from "../features/notes/components/NoteEditor";
import NoteDetail from "../features/notes/components/NoteDetail";
import { selectAllNotes, selectSelectedNote } from "../features/notes/notesSelectors";
import { selectActiveTab, selectViewMode } from "../features/notes/notesSelectors";
import { clearSelectedNote } from "../features/notes/notesSlice";

export default function Notes() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const activeTab = useSelector(selectActiveTab);
  const viewMode = useSelector(selectViewMode);
  const selectedNote = useSelector(selectSelectedNote);
  const notes = useSelector(selectAllNotes);

  useEffect(() => {
    if (user?.uid) {
      dispatch(loadNotes(user.uid));
    }
  }, [dispatch, user?.uid]);

useEffect(() => {
  if (activeTab === "New" && selectedNote) {
    dispatch(clearSelectedNote());
  }
}, [activeTab, selectedNote]);

  if (activeTab === "New") {
    dispatch(clearSelectedNote());
    return <NoteEditor />;
  }
  if (activeTab === "Folders") return <FolderView />;
  if (viewMode === "edit" && selectedNote) return <NoteEditor />;
  if (viewMode === "view" && selectedNote) return <NoteDetail />;

  return <NoteList notes={notes} />;
}
