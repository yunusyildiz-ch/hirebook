import { useState } from "react";

export default function Toolbar({ editor }) {
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#FFFF00");

  if (!editor) return null;

  const buttonClass = (isActive) =>
    `px-2 py-1 text-sm rounded ${
      isActive
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">

      {/* Text Styles */}
      <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonClass(editor.isActive("bold"))}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonClass(editor.isActive("italic"))}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonClass(editor.isActive("underline"))}>Underline</button>
      <button onClick={() => editor.chain().focus().toggleStrike().run()} className={buttonClass(editor.isActive("strike"))}>Strike</button>

      {/* Headings */}
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonClass(editor.isActive("heading", { level: 1 }))}>H1</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonClass(editor.isActive("heading", { level: 2 }))}>H2</button>
      <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonClass(editor.isActive("heading", { level: 3 }))}>H3</button>

      {/* Lists and Block */}
      <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonClass(editor.isActive("bulletList"))}>• List</button>
      <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonClass(editor.isActive("orderedList"))}>1. List</button>
      <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={buttonClass(editor.isActive("blockquote"))}>Quote</button>

      {/* Colors */}
      <label className="text-xs text-gray-700 dark:text-gray-300">Text Color</label>
      <input
        type="color"
        value={textColor}
        onChange={(e) => {
          setTextColor(e.target.value);
          editor.chain().focus().setColor(e.target.value).run();
        }}
        className="w-6 h-6 p-0 border-none"
      />

      <label className="text-xs text-gray-700 dark:text-gray-300">Highlight</label>
      <input
        type="color"
        value={highlightColor}
        onChange={(e) => {
          setHighlightColor(e.target.value);
          editor.chain().focus().setHighlight({ color: e.target.value }).run();
        }}
        className="w-6 h-6 p-0 border-none"
      />

      {/* Image */}
      <button
        onClick={() => {
          const url = window.prompt("Enter Image URL:");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className={buttonClass(false)}
      >
        Image
      </button>

      {/* Undo / Redo / Clear */}
      <button onClick={() => editor.chain().focus().undo().run()} className={buttonClass(false)}>Undo</button>
      <button onClick={() => editor.chain().focus().redo().run()} className={buttonClass(false)}>Redo</button>
      <button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className={buttonClass(false)}>Clear</button>
    </div>
  );
}