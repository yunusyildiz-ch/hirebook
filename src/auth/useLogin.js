import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { validateLoginForm } from "./validators";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
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
      await login(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return { handleLogin, error, authLoading };
};