import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { validateLoginForm } from "@/utils/validators";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleLogin = async (email, password) => {
    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    setAuthLoading(true);
    try {
      const userCredential = await login(email, password);

      if (!userCredential.user.emailVerified) {
        toast(
          "Please verify your email address. 📩",
          { icon: "⚠️", style: { background: "#fef3c7", color: "#92400e" } }
        );
        navigate("/verify-email-info");
        return;
      }

      toast.success("Login successful! 🎉");
      const redirectPath = location.state?.from?.pathname || "/dashboard";
      navigate(redirectPath);
    } catch (err) {
      const friendlyMessage = getFirebaseErrorMessage(err.code || err.message);
      setError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  return { handleLogin, error, authLoading };
};