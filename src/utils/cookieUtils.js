/**
 * Stores user's cookie preferences in localStorage
 * @param {Object} preferences - The user's cookie preferences
 */
// Sets user's cookie preferences in localStorage
export const setConsentStatus = (preferences) => {
  localStorage.setItem("cookieConsent", JSON.stringify(preferences));
};

// Retrieves cookie preferences from localStorage
export const getConsentStatus = () => {
  try {
    const data = localStorage.getItem("cookieConsent");
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

// Checks whether the user has actively made a cookie consent decision
export const isConsentGiven = () => {
  const consent = getConsentStatus();

  // Consent is considered valid only if key properties exist
  return (
    consent &&
    typeof consent === "object" &&
    "necessary" in consent &&
    (
      "analytics" in consent ||
      "marketing" in consent ||
      "functionality" in consent ||
      "social" in consent
    )
  );
};