import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AvatarEditorModal from "@modals/AvatarEditorModal";
import { uploadAvatar, deleteAvatar } from "@/services/avatarService";
import UserAvatar from "./UserAvatar";
import { toast } from "react-hot-toast";
import { MdOutlinePhotoCamera } from "react-icons/md";

export default function AvatarUploader({ size = 96 }) {
  const { user, refreshUser } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setShowModal(true);
    }
  };

  const handleSave = async (fileOrBlob) => {
    try {
      const url = await uploadAvatar(fileOrBlob);
      await refreshUser();
      toast.success("Avatar updated");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed");
    } finally {
      setSelectedFile(null);
      setShowModal(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAvatar();
      await refreshUser();
      toast.success("Avatar deleted");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Could not delete avatar");
    } finally {
      setSelectedFile(null);
      setShowModal(false);
    }
  };

  return (
    <>
      {/* 👤 Avatar + clickable overlay */}
      <div
        className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
        onClick={() => setShowModal(true)}
        title="Click to edit avatar"
      >
        <UserAvatar size={size} />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <MdOutlinePhotoCamera size={22} className="text-white" />
        </div>
      </div>

      {/* 🔄 Modal with crop / upload / delete actions */}
      {showModal && (
        <AvatarEditorModal
          file={selectedFile}
          currentPhotoURL={user?.photoURL}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => {
            setSelectedFile(null);
            setShowModal(false);
          }}
        />
      )}

      {/* Hidden input (triggered inside modal or fallback) */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        id="avatar-file-input"
      />
    </>
  );
}