import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes, deleteNoteThunk } from "@notes/notesThunks";
import { useAuth } from "@contexts/AuthContext";
import NoteList from "@notes/components/NoteList";
import NoteEditor from "@notes/components/NoteEditor";
import NoteDetail from "@notes/components/NoteDetail";
import FolderView from "@notes/views/FolderView";
import ConfirmModal from "@modals/ConfirmModal";
import {
  selectActiveTab,
  selectSelectedNote,
  selectViewMode,
  selectAllNotes,
} from "@notes/notesSelectors";
import { clearSelectedNote } from "@notes/notesSlice";
import { setViewMode, setActiveTab } from "@notes/notesUI.slice";

export default function Notes() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const activeTab = useSelector(selectActiveTab);
  const viewMode = useSelector(selectViewMode);
  const selectedNote = useSelector(selectSelectedNote);
  const notes = useSelector(selectAllNotes);

  const [showConfirm, setShowConfirm] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      dispatch(loadNotes(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleDeleteRequest = (note) => {
    setNoteToDelete(note);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;
    await dispatch(deleteNoteThunk(noteToDelete.id));
    dispatch(clearSelectedNote());
    dispatch(setViewMode("list"));
    dispatch(setActiveTab("All"));
    setShowConfirm(false);
  };

  const cancelDelete = () => {
    setNoteToDelete(null);
    setShowConfirm(false);
  };

  // ✅ New note açıldığında her tab'da edit gösterilir
  if (viewMode === "edit") {
    return <NoteEditor />;
  }

  // ✅ Sadece edit değilse FolderView gösterilir
  if (activeTab === "Folders") {
    return <FolderView />;
  }

  if (viewMode === "view" && selectedNote) {
    return <NoteDetail />;
  }

  return (
    <>
      <NoteList notes={notes} onDelete={handleDeleteRequest} />
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
}