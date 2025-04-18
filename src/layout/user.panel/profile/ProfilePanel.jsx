// src/layout/user.panel/profile/ProfilePanel.jsx
import { useAuth } from "@/contexts/AuthContext";
import ProfileEditForm from "./ProfileEditForm";
import AvatarUploader from "./AvatarUploader";
import { useEffect, useState } from "react";

export default function ProfilePanel() {
  const { user, refreshUser, syncWithGoogle } = useAuth();
  const [photoURL, setPhotoURL] = useState(user?.photoURL);

  const fullName = user?.displayName || "Qatip User";
  const email = user?.email || "unknown@example.com";

  useEffect(() => {
    // 📦 Her açıldığında güncel verileri çek
    refreshUser();
    syncWithGoogle(); // 🔁 Google'dan gelen yeni verileri Firestore'a kaydet
  }, []);

  const handleAvatarUpdate = (url) => {
    setPhotoURL(url);
    refreshUser();
  };

  return (
    <div className="space-y-6 text-sm text-gray-800 dark:text-gray-200">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <AvatarUploader
          currentPhotoURL={photoURL}
          onUploadSuccess={handleAvatarUpdate}
        />
        <div>
          <h2 className="text-lg font-semibold">{fullName}</h2>
          <p className="text-gray-500 dark:text-gray-400">{email}</p>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-600" />

      {/* Editable Form */}
      <ProfileEditForm currentName={fullName} currentEmail={email} />
    </div>
  );
}