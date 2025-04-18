import { useState } from "react";
import { Camera } from "lucide-react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "@services/firebase/config";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "@/services/userService";
import { useAuth } from "@/contexts/AuthContext";
import UserAvatar from "@layout/user.panel/components/UserAvatar";

export default function AvatarUploader({ onUploadSuccess }) {
  const [uploading, setUploading] = useState(false);
  const { refreshUser, user } = useAuth();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `avatars/${auth.currentUser.uid}`);

    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      await updateUserProfile(auth.currentUser.uid, { photoURL: downloadURL });

      await refreshUser();
      onUploadSuccess(downloadURL);

      toast.success("Avatar updated successfully");
    } catch (error) {
      console.error("Avatar upload failed:", error);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative group w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
      {/* ✅ Reusable avatar */}
      <UserAvatar size={96} />

      <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center cursor-pointer">
        <Camera size={20} className="text-white" />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />
      </label>
    </div>
  );
}