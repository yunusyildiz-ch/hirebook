import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Image as ImageIcon,
  Eraser,
  Paintbrush2,
  Highlighter,
} from "lucide-react";
import { useState } from "react";

export default function Toolbar({ editor }) {
  const [textColor, setTextColor] = useState("#000000");
  const [highlightColor, setHighlightColor] = useState("#ffff00");

  if (!editor) return null;

  const buttonClass = (active) =>
    `p-2 rounded-md transition ${
      active
        ? "bg-blue-600 text-white"
        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
    }`;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
      {/* Text Formatting */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive("bold"))}
        title="Bold"
      >
        <Bold size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive("italic"))}
        title="Italic"
      >
        <Italic size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={buttonClass(editor.isActive("underline"))}
        title="Underline"
      >
        <Underline size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={buttonClass(editor.isActive("strike"))}
        title="Strikethrough"
      >
        <Strikethrough size={18} />
      </button>

      {/* Headings */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 1 }))}
        title="Heading 1"
      >
        <Heading1 size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive("heading", { level: 2 }))}
        title="Heading 2"
      >
        <Heading2 size={18} />
      </button>

      {/* Lists and Block */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive("bulletList"))}
        title="Bullet List"
      >
        <List size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive("orderedList"))}
        title="Numbered List"
      >
        <ListOrdered size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={buttonClass(editor.isActive("blockquote"))}
        title="Blockquote"
      >
        <Quote size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={buttonClass(editor.isActive("codeBlock"))}
        title="Code Block"
      >
        <Code size={18} />
      </button>

      {/* Image Upload */}
      <button
        onClick={() => {
          const url = prompt("Enter image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className={buttonClass(false)}
        title="Insert Image"
      >
        <ImageIcon size={18} />
      </button>

      {/* Text Color */}
      <label title="Text Color" className="flex items-center gap-1">
        <Paintbrush2 size={18} />
        <input
          type="color"
          value={textColor}
          onChange={(e) => {
            setTextColor(e.target.value);
            editor.chain().focus().setColor(e.target.value).run();
          }}
          className="w-6 h-6 p-0 border-none bg-transparent"
        />
      </label>

      {/* Highlight */}
      <label title="Highlight" className="flex items-center gap-1">
        <Highlighter size={18} />
        <input
          type="color"
          value={highlightColor}
          onChange={(e) => {
            setHighlightColor(e.target.value);
            editor.chain().focus().setHighlight({ color: e.target.value }).run();
          }}
          className="w-6 h-6 p-0 border-none bg-transparent"
        />
      </label>

      {/* Undo / Redo */}
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={buttonClass(false)}
        title="Undo"
      >
        <Undo size={18} />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={buttonClass(false)}
        title="Redo"
      >
        <Redo size={18} />
      </button>

      {/* Clear formatting */}
      <button
        onClick={() =>
          editor.chain().focus().clearNodes().unsetAllMarks().run()
        }
        className={buttonClass(false)}
        title="Clear Formatting"
      >
        <Eraser size={18} />
      </button>
    </div>
  );
}