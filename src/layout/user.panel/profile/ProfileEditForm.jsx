import { useState } from "react";
import {
  updateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "@services/firebase/config";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "@services/userService";
import { useAuth } from "@contexts/AuthContext";
import { validatePassword } from "@utils/validators";
import PasswordInput from "@components/ui/PasswordInput";
import ConfirmModal from "@modals/ConfirmModal";
import ReauthenticateModal from "@modals/ReauthenticateModal";
import { deleteAccountCompletely } from "@services/accountService";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function ProfileEditForm({ currentName, currentEmail }) {
  const [name, setName] = useState(currentName || "");
  const [email, setEmail] = useState(currentEmail || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [showGoogleConfirm, setShowGoogleConfirm] = useState(false);

  const { refreshUser, logout, user } = useAuth();
  const navigate = useNavigate();

  const isGoogleUser = user?.providerData?.[0]?.providerId === "google.com";

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
        if (!validatePassword(password)) {
          toast.error(
            "Password must be at least 8 characters and include 1 uppercase, 1 lowercase, and 1 number."
          );
          setLoading(false);
          return;
        }
        await updatePassword(auth.currentUser, password);
      }

      if (Object.keys(updates).length > 0) {
        await updateUserProfile(auth.currentUser.uid, updates);
      }

      await refreshUser();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await deleteAccountCompletely();
      toast.success("Account deleted successfully");
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Account deletion failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-sm">
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-transparent focus:ring-1 transition"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-800 focus:outline-none focus:ring-primary focus:border-transparent focus:ring-1 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <PasswordInput
            showIcon={false}
            label="New Password"
            labelClassName="font-medium mb-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Leave blank to keep current password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-skyBlue rounded border border-skyBorder hover:bg-skyBorder hover:border-skyBlue text-white py-1 px-2 "
        >
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>

      <div className="mt-6 border-t pt-4">
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-600 text-sm hover:text-red-700 transition"
        >
          Delete My Account
        </button>
      </div>

      {/* Step 1: Initial Confirm */}
      <ConfirmModal
        isOpen={showDeleteConfirm}
        title="Delete Account"
        message="This action is permanent and will delete all your data. Are you sure you want to continue?"
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          setShowDeleteConfirm(false);
          isGoogleUser ? setShowGoogleConfirm(true) : setShowReauthModal(true);
        }}
      />

      {/* Step 2: Google Confirm */}
      <ConfirmModal
        isOpen={showGoogleConfirm}
        title={
          <span className="inline-flex items-center gap-2">
            <FcGoogle size={20} /> Remove Qatip from Google Auth
          </span>
        }
        message="You signed in with your Google account. Deleting your account will remove Qatip from your authorized apps. Are you sure?"
        onCancel={() => setShowGoogleConfirm(false)}
        onConfirm={() => {
          setShowGoogleConfirm(false);
          handleDeleteAccount();
        }}
      />

      {/* Step 2: Reauth for email/password */}
      <ReauthenticateModal
        isOpen={showReauthModal}
        onClose={() => setShowReauthModal(false)}
        onSuccess={handleDeleteAccount}
      />
    </>
  );
}