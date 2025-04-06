import {
    Bold,
    Italic,
    Underline,
    PaintBucket,
    ImagePlus,
    AlignLeft,
  } from "lucide-react";
  import { Button } from "@/components/ui/button"; // eğer yoksa normal <button> kullanabilirsin
  
  export default function Toolbar() {
    return (
      <div className="flex items-center gap-2 p-2 border-b border-gray-300 dark:border-gray-700">
        <button
          title="Bold"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Bold size={18} />
        </button>
  
        <button
          title="Italic"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Italic size={18} />
        </button>
  
        <button
          title="Underline"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Underline size={18} />
        </button>
  
        <button
          title="Text Color"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <PaintBucket size={18} />
        </button>
  
        <button
          title="Add Image"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <ImagePlus size={18} />
        </button>
  
        <button
          title="Align Left"
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <AlignLeft size={18} />
        </button>
      </div>
    );
  }