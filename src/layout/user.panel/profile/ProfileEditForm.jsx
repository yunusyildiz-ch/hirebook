import { useState } from "react";
import {
  updateProfile,
  updateEmail,
} from "firebase/auth";
import { auth } from "@services/firebase/config";
import { toast } from "react-hot-toast";
import { updateUserProfile } from "@services/userService";
import { useAuth } from "@contexts/AuthContext";
import ConfirmModal from "@modals/ConfirmModal";
import ReauthenticateModal from "@modals/ReauthenticateModal";
import UpdatePasswordModal from "@modals/UpdatePasswordModal";
import InfoModal from "@modals/InfoModal"; 
import { deleteAccountCompletely } from "@services/accountService";
import LoadingOverlay from "@components/LoadingOverlay";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

export default function ProfileEditForm({ currentName, currentEmail }) {
  const [name, setName] = useState(currentName || "");
  const [email, setEmail] = useState(currentEmail || "");
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const [showGoogleConfirm, setShowGoogleConfirm] = useState(false);

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showPasswordUpdateModal, setShowPasswordUpdateModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false); // ✅ InfoModal State

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

  const handleResetPassword = () => {
    if (isGoogleUser) {
      setShowInfoModal(true);
    } else {
      setShowResetPasswordModal(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      const user = auth.currentUser;
  
      // Check for recent login and reauthenticate if needed
      try {
        await deleteAccountCompletely();
        toast.success("Account deleted successfully");
        await logout();
        navigate("/");
      } catch (error) {
        if (error.message.includes("Reauthentication required")) {
          try {
            await reauthenticateUser(user);
            // Retry deletion after successful reauthentication
            await deleteAccountCompletely();
            toast.success("Account deleted successfully");
            await logout();
            navigate("/");
          } catch (reauthError) {
            console.error("Reauthentication failed:", reauthError);
            toast.error("Failed to reauthenticate. Please try again.");
          }
        } else {
          console.error("Delete account error:", error);
          toast.error("Account deletion failed. Try again.");
        }
      }
    } catch (error) {
      console.error("Delete account error:", error);
      toast.error("Account deletion failed. Try again.");
    } finally {
      setIsDeleting(false);
    }
  };
  

  return (
    <>
     {/* 🌀 Show Loading Overlay when deleting account */}
     {isDeleting && <LoadingOverlay message="Deleting your account..." />}

      <form onSubmit={handleSubmit} className="space-y-6 mt-6 text-sm">
  {/* Name input */}
  <div>
    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Full Name</label>
    <input
      type="text"
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-transparent transition"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  </div>

  {/* Email input */}
  <div>
    <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">Email</label>
    <input
    disabled
      type="email"
      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-transparent transition"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>

  {/* Reset Password Link */}
  <div className="pt-2">
    <button
      type="button"
      onClick={handleResetPassword}
      className="text-gray-500 hover:text-skyBlue hover:underline text-sm transition"
    >
      🔁 Reset Password
    </button>
  </div>

  {/* Update Profile Button */}
  <div>
    <button
      type="submit"
      disabled={loading}
      className="w-full py-2 rounded-md bg-skyBlue hover:bg-skyBorder text-white font-semibold text-sm transition disabled:opacity-50"
    >
      {loading ? "Saving..." : "Update Profile"}
    </button>
  </div>
</form>

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
  <button
    onClick={() => setShowDeleteConfirm(true)}
    className="text-gray-400 hover:text-red-600 text-sm font-medium transition"
  >
    🗑️ Delete My Account
  </button>
</div>

      {/* Delete Step 1: Confirm */}
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

      {/* Delete Step 2: Google Confirm */}
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

      {/* Delete Step 2: Reauth for email/password users */}
      <ReauthenticateModal
        isOpen={showReauthModal}
        onClose={() => setShowReauthModal(false)}
        onSuccess={handleDeleteAccount}
      />

      {/* Step 1: Reauthenticate before password update */}
      <ReauthenticateModal
        isOpen={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        onSuccess={() => {
          setShowResetPasswordModal(false);
          setShowPasswordUpdateModal(true);
        }}
      />

      {/* Step 2: Password update modal */}
      <UpdatePasswordModal
        isOpen={showPasswordUpdateModal}
        onClose={() => setShowPasswordUpdateModal(false)}
      />

      {/* Info Modal for Google Users */}
      <InfoModal
        isOpen={showInfoModal}
        title="Reset Password Unavailable"
        message="You signed in with your Google account. To change your password, visit your Google Account settings."
        icon={<FcGoogle size={24} />}
        onClose={() => setShowInfoModal(false)}
      />
    </>
  );
}