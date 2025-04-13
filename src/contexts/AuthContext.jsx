import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase/config";
import { createUserProfile } from "../services/userService";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

// Create the context for authentication
const AuthContext = createContext();

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap the app and provide auth logic
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Current logged-in user
  const [loading, setLoading] = useState(true); // Global loading while checking session
  const [authLoading, setAuthLoading] = useState(false); // Loading for login/register actions

  // Register a new user with email and password
  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCredential.user); // Create user document in Firestore
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    } finally {
      setAuthLoading(false);
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    } finally {
      setAuthLoading(false);
    }
  };

  // Login with Google provider
  const loginWithGoogle = async () => {
    setAuthLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user); // Ensure user document is created
      toast.success(`Welcome, ${result.user.displayName || "👋"}!`);
      return true;
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error.code));
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  // Sign out the current user
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Automatically check for session and load user profile on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Merge Firebase Auth user with Firestore profile data
            const profileData = userDocSnap.data();
            setUser({ ...currentUser, ...profileData });
          } else {
            setUser(currentUser);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setUser(currentUser); // Fallback to auth-only user
        }
      } else {
        setUser(null); // No user logged in
      }

      setLoading(false); // Initial check is complete
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loginWithGoogle,
        loading,
        authLoading,
      }}
    >
      {loading ? <Loader message="Authenticating..." /> : children}
    </AuthContext.Provider>
  );
};
