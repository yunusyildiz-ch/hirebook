import { useSelector, useDispatch } from "react-redux";
import FolderRenameModal from "@modals/folder-modals/FolderRenameModal";
import FolderColorModal from "@modals/folder-modals/FolderColorModal";
import { selectSelectedFolder, selectRenameModalOpen, selectColorModalOpen } from "@folders/foldersSelectors";
import { setRenameModalOpen, setColorModalOpen } from "@folders/foldersSlice";

export default function GlobalModals() {
  const dispatch = useDispatch();
  const selectedFolder = useSelector(selectSelectedFolder);
  const isRenameModalOpen = useSelector(selectRenameModalOpen);
  const isColorModalOpen = useSelector(selectColorModalOpen);

  return (
    <>
      {isRenameModalOpen && (
        <FolderRenameModal
          folder={selectedFolder}
          onClose={() => dispatch(setRenameModalOpen(false))}
        />
      )}
      {isColorModalOpen && (
        <FolderColorModal
          folder={selectedFolder}
          onClose={() => dispatch(setColorModalOpen(false))}
        />
      )}
    </>
  );
}