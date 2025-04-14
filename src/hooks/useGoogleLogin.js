import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const useGoogleLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const success = await loginWithGoogle();
    if (success) {
      navigate("/dashboard"); 
    }
  };

  return { handleGoogleLogin };
};