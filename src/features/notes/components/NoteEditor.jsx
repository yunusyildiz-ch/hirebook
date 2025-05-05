import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { selectSelectedNote, selectPreviousViewMode } from "../notesSelectors";
import { addNoteThunk, updateNoteThunk } from "../notesThunks";
import { clearSelectedNote } from "../notesSlice";
import { setViewMode, setActiveTab } from "../notesUI.slice";
import Toolbar from "./Toolbar";
import { showSuccess, showError } from "@/utils/toastUtils";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const selectedNote = useSelector(selectSelectedNote);
  const previousViewMode = useSelector(selectPreviousViewMode);

  const [title, setTitle] = useState("");
  const titleInputRef = useRef(null);

  const editor = useEditor({
    extensions: [StarterKit],
    content: selectedNote?.text || "",
    autofocus: true,
    editable: true,
  });

  useEffect(() => {
    if (editor) {
      if (selectedNote) {
        editor.commands.setContent(selectedNote.text || "");
        setTitle(selectedNote.title || "Untitled");
      } else {
        editor.commands.clearContent();
        setTitle("");
      }
    }
    if (!selectedNote && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [editor, selectedNote]);

  const handleSave = async () => {
    const text = editor?.getHTML() || "";
    const isTextEmpty = !text || text === "<p></p>";
    const trimmedTitle = title.trim();
  
    // Eğer title da boşsa, text de boşsa
    if (!trimmedTitle && isTextEmpty) {
      showError("Note title or content is required.");
      return;
    }
  
    try {
      if (selectedNote) {
        await dispatch(updateNoteThunk({ id: selectedNote.id, title: trimmedTitle || "Untitled", text }));
      } else {
        await dispatch(addNoteThunk({ title: trimmedTitle || "Untitled", text }));
      }
  
      if (previousViewMode === "view") {
        dispatch(setViewMode("view"));
      } else {
        dispatch(clearSelectedNote());
        dispatch(setViewMode("list"));
        dispatch(setActiveTab("All"));
      }
    } catch (error) {
      showError("Failed to save note.");
    }
  };

  const handleCancel = () => {
    if (previousViewMode === "view") {
      dispatch(setViewMode("view"));
    } else {
      dispatch(clearSelectedNote());
      dispatch(setViewMode("list"));
      dispatch(setActiveTab("All"));
    }
  };

  if (!editor) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      {/* Title input */}
      <input
        ref={titleInputRef}
        type="text"
        className="w-full text-3xl font-semibold bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        placeholder="Untitled"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Modern Toolbar */}
      <Toolbar editor={editor} />

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[60vh] w-full focus:outline-none px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-inner cursor-text prose dark:prose-invert max-w-none"
      />

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-500  hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm  text-white bg-skyBlue border border-skyBorder hover:bg-skyBorder hover:border-skyBlue"
        >
          Save
        </button>
      </div>
    </div>
  );
}

