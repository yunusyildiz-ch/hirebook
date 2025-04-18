import { useState } from "react";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "@/services/firebase/config";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "@/services/userService";
import { useAuth } from "@contexts/AuthContext";

export default function ProfileEditForm({ currentName, currentEmail }) {
  const [name, setName] = useState(currentName || "");
  const [email, setEmail] = useState(currentEmail || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates = {};

      if (name !== currentName) {
        await updateProfile(auth.currentUser, { displayName: name });
        updates.displayName = name;
      }

      if (email !== currentEmail) {
        await updateEmail(auth.currentUser, email);
        updates.email = email;
      }

      if (password) {
        await updatePassword(auth.currentUser, password);
      }

      if (Object.keys(updates).length > 0) {
        await updateUserProfile(auth.currentUser.uid, updates);
      }

      await refreshUser(); // ✅ Yeni bilgileri çek
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-sm">
      <div>
        <label className="block font-medium mb-1">Full Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">New Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Update Profile"}
      </button>
    </form>
  );
}