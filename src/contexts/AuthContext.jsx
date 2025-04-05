import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { createUserProfile } from "../services/userService";
import { getFirebaseErrorMessage } from "../utils/firebaseErrors";
import Loader from "../components/Loader";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
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
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      throw new Error(getFirebaseErrorMessage(error.code));
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
      value={{ user, login, register, logout, loading, authLoading }}
    >
      {loading ? <Loader message="Authenticating..." /> : children}
    </AuthContext.Provider>
  );
};