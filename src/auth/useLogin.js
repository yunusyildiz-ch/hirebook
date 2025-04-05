import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { validateLoginForm } from "./validators";

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (email, password) => {
    // Client-side validation
    const validationError = validateLoginForm(email, password);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      await login(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      const errMsg = err.message || "Login failed. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return { handleLogin, error };
};