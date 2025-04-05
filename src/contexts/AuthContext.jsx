import { createContext, useContext, useEffect, useState } from "react";
import { createUserProfile } from "../services/userService";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import Loader from "../components/Loader";
import { auth } from "../firebase/config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial app-level loading state
  const [authLoading, setAuthLoading] = useState(false); // Spinner for login/register actions

  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCredential.user);
      return userCredential;
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once auth state is known
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
      {authLoading && <Loader message="Authenticating..." />}
      {!loading ? children : <Loader message="Loading App..." />}
    </AuthContext.Provider>
  );
};
