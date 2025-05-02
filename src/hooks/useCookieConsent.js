import { useContext } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { saveCookiePreferences } from "@services/cookieService";

// Senin var olan hook içinde:
export const useCookieConsent = () => {
  const { currentUser } = useContext(AuthContext);

  const updatePreferences = async (prefs) => {
    localStorage.setItem("cookieConsent", JSON.stringify(prefs));
    if (currentUser) {
      await saveCookiePreferences(currentUser.uid, prefs);
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
