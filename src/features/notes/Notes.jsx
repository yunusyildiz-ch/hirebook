import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoteList from "./components/NoteList";
import { loadNotes } from "./notesThunks";
import { useAuth } from "@/contexts/AuthContext";
import FolderView from "./views/FolderView";
import NoteEditor from "./components/NoteEditor";
import NoteDetail from "./components/NoteDetail";
import { selectAllNotes, selectSelectedNote } from "./notesSelectors";
import { selectActiveTab, selectViewMode } from "./notesSelectors";

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

  if (activeTab === "New") return <NoteEditor />;
  if (activeTab === "Folders") return <FolderView />;
  if (viewMode === "edit" && selectedNote) return <NoteEditor />;
  if (viewMode === "view" && selectedNote) return <NoteDetail />;

  return <NoteList notes={notes} />;
}
