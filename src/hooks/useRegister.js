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
      toast.success("Account created successfully! Please verify your email 📩");
      navigate("/auth-action");
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