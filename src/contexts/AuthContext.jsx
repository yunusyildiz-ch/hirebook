import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";
import { createUserProfile } from "../services/userService";
import { FIREBASE_ERRORS } from "../utils/firebaseErrors";
import Loader from "../components/Loader";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);              // Current authenticated user
  const [loading, setLoading] = useState(true);        // Global app loading
  const [authLoading, setAuthLoading] = useState(false); // Login/Register spinner

  // REGISTER FUNCTION
  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCredential.user);
      return userCredential;
    } catch (error) {
      const errorMessage =
        FIREBASE_ERRORS[error.code] || "Something went wrong. Please try again.";
      console.error("Register Error:", error);
      throw new Error(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  // LOGIN FUNCTION
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      const errorMessage =
        FIREBASE_ERRORS[error.code] || "Login failed. Please try again.";
      console.error("Login Error:", error);
      throw new Error(errorMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  // LOGOUT FUNCTION
  const logout = () => signOut(auth);

  // LISTEN TO AUTH STATE CHANGES
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    authLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader message="Authenticating..." /> : children}
    </AuthContext.Provider>
  );
};
