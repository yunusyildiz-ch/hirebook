import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadNotes } from "@/features/notes/notesThunks";
import { useAuth } from "@/contexts/AuthContext";
import NoteList from "@/features/notes/components/NoteList";
import NoteEditor from "@/features/notes/components/NoteEditor";
import NoteDetail from "@/features/notes/components/NoteDetail";
import FolderView from "@/features/notes/views/FolderView";
import { clearSelectedNote } from "@/features/notes/notesSlice";
import {
  selectActiveTab,
  selectSelectedNote,
  selectViewMode,
  selectAllNotes,
} from "@/features/notes/notesSelectors";

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

  return (
    <>
      {activeTab === "New" ? (
        <NoteEditor />
      ) : activeTab === "Folders" ? (
        <FolderView />
      ) : viewMode === "edit" && selectedNote ? (
        <NoteEditor />
      ) : viewMode === "view" && selectedNote ? (
        <NoteDetail />
      ) : (
        <NoteList notes={notes} />
      )}
    </>
  );
}