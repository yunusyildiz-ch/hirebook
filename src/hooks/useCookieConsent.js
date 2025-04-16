import { useEffect, useState } from "react";
import { getConsentStatus, setConsentStatus } from "../utils/cookieUtils";

/**
 * Custom hook for managing cookie consent preferences
 */
export const useCookieConsent = () => {
  const [consent, setConsent] = useState(null);

  // Load stored preferences on initial render
  useEffect(() => {
    const stored = getConsentStatus();
    if (stored) setConsent(stored);
  }, []);

  // Accept all cookie categories
  const acceptAll = () => {
    const preferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functionality: true,
      social: true,
    };
    setConsentStatus(preferences);
    setConsent(preferences);
  };

  // Reject all optional categories (necessary always true)
  const rejectAll = () => {
    const preferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functionality: false,
      social: false,
    };
    setConsentStatus(preferences);
    setConsent(preferences);
  };

  // Set custom preferences (used by the CookieModal)
  const updatePreferences = (preferences) => {
    const fullPreferences = {
      necessary: true,
      ...preferences,
    };
    setConsentStatus(fullPreferences);
    setConsent(fullPreferences);
  };

  return {
    consent,
    acceptAll,
    rejectAll,
    updatePreferences,
  };
};