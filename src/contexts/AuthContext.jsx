import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase/config";
import { createUserProfile, updateUserProfile } from "@/services/userService";
import { saveCookiePreferences, getCookiePreferences } from "@/services/cookieService";
import { getConsentStatus, setConsentStatus } from "@/utils/cookieUtils";
import Loader from "@/components/Loader";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// 🔥 Email verification redirect ayarı
const actionCodeSettings = {
  url: "https://qatip.app/auth-action",
  handleCodeInApp: true,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async (email, password, firstname, lastname) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await createUserProfile(userCredential.user, firstname, lastname);
    await sendEmailVerification(userCredential.user, actionCodeSettings);
    return userCredential;
  };

  const resendVerificationEmail = async () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      try {
        await sendEmailVerification(auth.currentUser, actionCodeSettings);
      } catch (error) {
        console.error("Failed to resend verification email:", error);
        throw error;
      }
    } else {
      throw new Error("No user or already verified.");
    }
  };

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    await createUserProfile(result.user);
    return result.user;
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("cookieConsent"); // 🔐 local clean-up
  };

  const refreshUser = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      await currentUser.reload();
      const updatedUser = auth.currentUser;
      const userDocRef = doc(db, "users", updatedUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const profileData = userDocSnap.data();
        setUser({ ...updatedUser, ...profileData });
      } else {
        setUser(updatedUser);
      }
    }
  };

  const isEmailVerified = () => {
    return auth.currentUser?.emailVerified ?? false;
  };

  const syncWithGoogle = async () => {
    const currentUser = auth.currentUser;
    if (currentUser?.providerData[0]?.providerId === "google.com") {
      await refreshUser();
      await updateUserProfile(currentUser.uid, {
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const profileData = userDocSnap.data();
            setUser({ ...currentUser, ...profileData });
          } else {
            setUser(currentUser);
          }

          // ✅ Cookie sync: localStorage <=> Firestore
          const localConsent = getConsentStatus();
          const remoteConsent = await getCookiePreferences(currentUser.uid);

          if (!localConsent && remoteConsent) {
            setConsentStatus(remoteConsent); // 🔁 Firestore → local
          }

          if (localConsent && !remoteConsent) {
            await saveCookiePreferences(currentUser.uid, localConsent); // 🔁 local → Firestore
          }

        } catch (error) {
          console.error("Error during user/profile/cookie setup:", error);
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginWithGoogle,
        refreshUser,
        syncWithGoogle,
        isEmailVerified,
        resendVerificationEmail,
        loading,
      }}
    >
      {loading ? <Loader message="Authenticating..." /> : children}
    </AuthContext.Provider>
  );
};