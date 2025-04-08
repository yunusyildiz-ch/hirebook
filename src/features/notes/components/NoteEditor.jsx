import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";
import { addNoteThunk, updateNoteThunk } from "../notesThunks";
import { clearSelectedNote } from "../notesSlice";
import { setViewMode, setActiveTab } from "../notesUI.Slice";
import { selectSelectedNote } from "../notesSelectors";
import toast from "react-hot-toast";

export default function NoteEditor() {
  const dispatch = useDispatch();
  const selectedNote = useSelector(selectSelectedNote);
  const [title, setTitle] = useState("");
  const titleInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      TextStyle,
      Color,
      Highlight,
      Placeholder.configure({
        placeholder: "Start writing your note...",
      }),
    ],
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
    if (!editor) return;
    const text = editor.getHTML().trim();
    const trimmedTitle = title.trim() || "Untitled Note";

    if (!text || text === "<p></p>") {
      toast.error("Note content is empty.");
      return;
    }

    if (selectedNote) {
      await dispatch(updateNoteThunk({ id: selectedNote.id, title: trimmedTitle, text }));
      dispatch(setViewMode("view"));
    } else {
      await dispatch(addNoteThunk({ title: trimmedTitle, text }));
      dispatch(clearSelectedNote());
      dispatch(setActiveTab("All"));
      dispatch(setViewMode("list"));
    }
  };

  const handleCancel = () => {
    if (selectedNote) {
      dispatch(setViewMode("view"));
    } else {
      dispatch(setActiveTab("All"));
      dispatch(clearSelectedNote());
      dispatch(setViewMode("list"));
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

      {/* Editor area */}
      <EditorContent
        editor={editor}
        tabIndex={0}
        onClick={() => editor?.commands.focus()}
        className="min-h-[60vh] w-full focus:outline-none px-6 py-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-inner cursor-text prose dark:prose-invert max-w-none"
      />

      {/* Action buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={handleCancel}
          className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
