import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";
import { validateRegisterForm } from "@/utils/validators";
import { getFirebaseErrorMessage } from "@/utils/firebaseErrors";
import { startCooldownTimer } from "@/utils/cooldownUtils";

export const useRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  const handleRegister = async (email, password, firstname, lastname, setFormError) => {
    const validationError = validateRegisterForm(email, password);
    if (validationError) {
      setFormError(validationError);
      toast.error(validationError);
      return;
    }

    setAuthLoading(true);
    try {
      await register(email, password, firstname, lastname);

      startCooldownTimer(); // Save cooldown start time to localStorage

      toast.success("Account created successfully! Please verify your email 📩");
      navigate("/verify-email-info");
    } catch (err) {
      const friendlyMessage = getFirebaseErrorMessage(err.code || err.message);
      setError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setAuthLoading(false);
    }
  };

  return { handleRegister, error, authLoading };
};