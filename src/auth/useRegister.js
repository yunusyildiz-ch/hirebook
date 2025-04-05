import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-hot-toast";
import { validateRegisterForm } from "./validators";

export const useRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleRegister = async (email, password) => {
    // Client-side validation
    const validationError = validateRegisterForm(email, password);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    try {
      await register(email, password);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      const errMsg = err.message || "Registration failed. Please try again.";
      setError(errMsg);
      toast.error(errMsg);
    }
  };

  return { handleRegister, error };
};