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
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);

  // ✅ REGISTER
  const register = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfile(userCredential.user);
      return userCredential;
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      console.error("Register Error:", error.code);
      throw new Error(errorMessage); // ✅ Hatalı kodu kullanıcıya uygun mesajla yolluyoruz
    } finally {
      setAuthLoading(false);
    }
  };

  // ✅ LOGIN
  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential;
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.code);
      console.error("Login Error:", error.code);
      throw new Error(errorMessage); // ✅ Aynı mantık burada da
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed.");
    }
  };

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
