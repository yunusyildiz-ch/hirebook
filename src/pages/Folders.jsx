import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFolders } from "@/features/folders/foldersThunks";
import FoldersList from "@/features/folders/components/FoldersList";
import { useAuth } from "@/contexts/AuthContext"; 

export default function FoldersPage() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) {
      dispatch(loadFolders(user.uid));
    } else {
    }
  }, [dispatch, user]);

  return (
    <div className="p-4">
      <FoldersList />
    </div>
  );
}