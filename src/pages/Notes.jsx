import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes } from "@notes/notesThunks";
import { useAuth } from "@contexts/AuthContext";
import NoteList from "@notes/components/NoteList";
import NoteEditor from "@notes/components/NoteEditor";
import NoteDetail from "@notes//components/NoteDetail";
import FolderView from "@notes//views/FolderView";
import {
  selectActiveTab,
  selectSelectedNote,
  selectViewMode,
  selectAllNotes,
} from "@notes/notesSelectors";
import { clearSelectedNote } from "@notes/notesSlice";

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
    if (viewMode === "edit" && !selectedNote) {
      dispatch(clearSelectedNote());
    }
  }, [viewMode, selectedNote, dispatch]);

  if (activeTab === "Folders") {
    return <FolderView />;
  }

  if (viewMode === "edit") {
    return <NoteEditor />;
  }

  if (viewMode === "view" && selectedNote) {
    return <NoteDetail />;
  }

  return <NoteList notes={notes} />;
}