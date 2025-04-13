import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,       
  signInWithPopup,          
} from "firebase/auth";
import { auth } from "../services/firebase/config";
import { createUserProfile } from "../services/userService";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import Loader from "../components/Loader";
import { toast } from "react-hot-toast";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await createUserProfile(userCredential.user);
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
    } finally {
      setAuthLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setAuthLoading(true);
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
      toast.success(`Welcome, ${result.user.displayName || "👋"}!`);
      return true; 
    } catch (error) {
      toast.error(getFirebaseErrorMessage(error.code));
      return false;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, authLoading,loginWithGoogle }}
    >
      {loading ? <Loader message="Authenticating..." /> : children}
    </AuthContext.Provider>
  );
};
