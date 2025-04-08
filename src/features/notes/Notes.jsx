import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NoteList from "./components/NoteList";
import { loadNotes } from "./notesThunks";
import { useAuth } from "@/contexts/AuthContext";
import FolderView from "./views/FolderView"
import NoteEditor from "./components/NoteEditor";
import NoteDetail from "./components/NoteDetail";

export default function Notes() {
  const dispatch = useDispatch();
  const { activeTab, viewMode, selectedNote, notes } = useSelector((state) => state.notes);
  const {user} = useAuth();

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