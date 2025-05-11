import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FolderCard from "./FolderCard";
import ConfirmModal from "@modals/ConfirmModal";
import { selectAllFolders, selectFolderViewMode } from "../foldersSelectors";
import { handleDelete } from "@utils/folderActions";

export default function FoldersList() {
  const folders = useSelector(selectAllFolders);
  const viewMode = useSelector(selectFolderViewMode);
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const confirmDelete = async () => {
    try {
      await handleDelete(dispatch, selectedFolder);
      setShowDeleteModal(false);
      setSelectedFolder(null);
    } catch (error) {
      console.error("❌ [FoldersList] Delete failed:", error);
    }
  };

  if (folders.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-300">
        No folders found. Create a new folder to get started.
      </div>
    );
  }

  return (
    <div
      className={`p-6 ${
        viewMode === "grid"
          ? "grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4"
          : "flex flex-col gap-2"
      }`}
    >
      {folders.map((folder) => (
        <div key={folder.id}>
          <FolderCard
            folder={folder}
            viewMode={viewMode}
            onDelete={() => {
              setSelectedFolder(folder);
              setShowDeleteModal(true);
            }}
          />
        </div>
      ))}

      {/* ✅ Silme Onay Modali */}
      {showDeleteModal && selectedFolder && (
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Delete Folder"
          message={`Are you sure you want to delete the folder: "${selectedFolder?.title}"?`}
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}

