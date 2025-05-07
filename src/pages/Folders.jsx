import { useSelector } from "react-redux";
import { selectFolderViewMode } from "@/features/folders/foldersSelectors";

export default function Folder() {
  const viewMode = useSelector(selectFolderViewMode);

  return (
    <div className="p-4">
      <div className="mt-4">
        {viewMode === "list" ? (
          <div>📁 Folder List - Coming Soon!</div>
        ) : (
          <div>✏️ Edit/Create Folder - Coming Soon!</div>
        )}
      </div>
    </div>
  );
}