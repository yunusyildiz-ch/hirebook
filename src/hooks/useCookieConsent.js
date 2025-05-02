import { useAuth } from "@contexts/AuthContext";
import { saveCookiePreferences } from "@services/cookieService";

export const useCookieConsent = () => {
  const { user } = useAuth();

  const updatePreferences = async (prefs) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    if (user) {
      await saveCookiePreferences(user.uid, prefs);
    }
  };

  const acceptAll = () => {
    const prefs = {
      necessary: true,
      analytics: true,
      marketing: true,
      functionality: true,
      social: true,
    };
    updatePreferences(prefs);
  };

  const rejectAll = () => {
    const prefs = {
      necessary: true,
      analytics: false,
      marketing: false,
      functionality: false,
      social: false,
    };
    updatePreferences(prefs);
  };

  return { updatePreferences, acceptAll, rejectAll };
};
